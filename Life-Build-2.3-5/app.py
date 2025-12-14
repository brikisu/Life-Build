from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Rotina, etiquetas as EtiquetaModel, BannedUser, ResetToken
import secrets
from datetime import timedelta
from datetime import datetime
import os
import sqlite3
from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = 'chave-secreta'

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'banco.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
    # Ensure `last_login` column exists for older databases
    try:
        db_path = os.path.join(BASE_DIR, 'banco.db')
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cols = [r[1] for r in cur.execute("PRAGMA table_info(usuarios)").fetchall()]
        if 'last_login' not in cols:
            cur.execute("ALTER TABLE usuarios ADD COLUMN last_login DATETIME")
            conn.commit()
            print('Adicionada coluna last_login em usuarios')
        conn.close()
    except Exception as e:
        print('Não foi possível garantir coluna last_login:', e)
    # Create a default admin user only if it does not already exist
    admin_email = 'admin@example.com'
    if not User.query.filter_by(email=admin_email).first():
        u = User(nome='Admin', email=admin_email, senha_hash=generate_password_hash('admin123'))
        db.session.add(u)
        db.session.commit()
        print('Criado admin id=', u.id, 'email=', admin_email)
    else:
        print('Admin user already exists:', admin_email)

# Emails allowed to see the admin panel and perform admin actions
ADMIN_EMAILS = ['admin@local', 'admin@example.com']

def is_admin_user():
    if 'usuario_id' not in session:
        return False
    u = User.query.get(session['usuario_id'])
    return bool(u and u.email in ADMIN_EMAILS)


# Dev helper: lista usuários existentes (para depuração local apenas)
@app.route('/_dev/admin_info')
def _dev_admin_info():
    try:
        users = User.query.all()
        return jsonify([{'id': u.id, 'nome': u.nome, 'email': u.email} for u in users])
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def _is_local_request():
    # allow only loopback for dev helpers
    addr = request.remote_addr
    return addr in ('127.0.0.1', '::1', 'localhost')


@app.route('/_dev/user_info')
def _dev_user_info():
    if not _is_local_request():
        return jsonify({'error': 'forbidden'}), 403
    email = request.args.get('email')
    if not email:
        return jsonify({'error': 'missing email param'}), 400
    u = User.query.filter_by(email=email).first()
    if not u:
        return jsonify({'error': 'not found'}), 404
    return jsonify({'id': u.id, 'nome': u.nome, 'email': u.email, 'senha_hash': u.senha_hash})


@app.route('/_dev/set_password')
def _dev_set_password():
    if not _is_local_request():
        return jsonify({'error': 'forbidden'}), 403
    email = request.args.get('email')
    pwd = request.args.get('pwd')
    if not email or not pwd:
        return jsonify({'error': 'missing email or pwd param'}), 400
    u = User.query.filter_by(email=email).first()
    if not u:
        return jsonify({'error': 'not found'}), 404
    u.senha_hash = generate_password_hash(pwd)
    db.session.commit()
    return jsonify({'success': True, 'email': u.email})


@app.route('/')
def index():
    return redirect(url_for('login'))


@app.route('/esqueci', methods=['GET', 'POST'])
def esqueci():
    # Forgot password: form or JSON
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            email = data.get('email')
        else:
            email = request.form.get('email')

        if not email:
            if request.is_json:
                return jsonify(success=False, error='missing email'), 400
            flash('Informe o e-mail.', 'warning')
            return redirect(url_for('esqueci'))

        user = User.query.filter_by(email=email).first()
        if not user:
            # Do not reveal whether email exists; behave as if sent
            if request.is_json:
                return jsonify(success=True)
            flash('Se o e-mail estiver cadastrado, você receberá instruções para recuperar a senha.', 'info')
            return redirect(url_for('login'))

        # create token
        token = secrets.token_urlsafe(24)
        expires = datetime.utcnow() + timedelta(hours=1)
        rt = ResetToken(user_id=user.id, token=token, expires_at=expires)
        db.session.add(rt)
        db.session.commit()

        reset_url = url_for('reset_password', token=token, _external=True)
        # In dev mode we print the link to console; in production you'd send an email.
        print(f"[password-reset] reset link for {email}: {reset_url}")

        if request.is_json:
            return jsonify(success=True, reset_url=reset_url)
        flash('Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha (veja console durante o desenvolvimento).', 'info')
        return redirect(url_for('login'))

    return render_template('esqueci.html')


@app.route('/reset/<token>', methods=['GET', 'POST'])
def reset_password(token):
    rt = ResetToken.query.filter_by(token=token, used=False).first()
    now = datetime.utcnow()
    if not rt or rt.expires_at < now:
        flash('Token inválido ou expirado.', 'danger')
        return redirect(url_for('login'))

    if request.method == 'POST':
        # accept form or json
        if request.is_json:
            data = request.get_json()
            newpwd = data.get('senha')
        else:
            newpwd = request.form.get('senha')

        if not newpwd or len(newpwd) < 6:
            if request.is_json:
                return jsonify(success=False, error='Senha inválida'), 400
            flash('Senha inválida. Use ao menos 6 caracteres.', 'warning')
            return redirect(url_for('reset_password', token=token))

        u = User.query.get(rt.user_id)
        if not u:
            if request.is_json:
                return jsonify(success=False, error='user not found'), 404
            flash('Usuário não encontrado.', 'danger')
            return redirect(url_for('login'))

        u.senha_hash = generate_password_hash(newpwd)
        rt.used = True
        db.session.commit()

        if request.is_json:
            return jsonify(success=True)
        flash('Senha redefinida com sucesso! Faça login.', 'success')
        return redirect(url_for('login'))

    return render_template('reset_password.html', token=token)

@app.route('/login', methods=['GET', 'POST'])
def login():
    # Support both form POST and JSON API requests
    if request.method == 'POST':
        # Accept either JSON or form POST
        if request.is_json:
            data = request.get_json()
            email = data.get('email')
            senha = data.get('senha')
        else:
            email = request.form.get('email')
            senha = request.form.get('senha')

        # Debug logging to help diagnose login issues
        print(f"[login] attempt email={email}")
        usuario = User.query.filter_by(email=email).first()
        print(f"[login] user_found={bool(usuario)}")

        if usuario:
            pw_ok = check_password_hash(usuario.senha_hash, senha)
            print(f"[login] password_match={pw_ok}")
        else:
            pw_ok = False

        if usuario and pw_ok:
            session['usuario_id'] = usuario.id
            # mark last login time
            try:
                usuario.last_login = datetime.utcnow()
                db.session.commit()
            except Exception:
                db.session.rollback()
            # If JSON request, return JSON response with admin flag
            if request.is_json:
                return jsonify(success=True, is_admin=(usuario.email in ADMIN_EMAILS))
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('home'))
        else:
            # Return explicit error message for JSON clients
            if request.is_json:
                return jsonify(success=False, error='E-mail ou senha incorretos.'), 401
            flash('E-mail ou senha incorretos.', 'danger')

    return render_template('index.html')


# --- API endpoints for frontend integration ---
def serialize_rotina(r):
    return {
        'id': r.id,
        'titulo': r.titulo,
        'descricao': r.descricao,
        'data_vencimento': r.data_inicio.strftime('%Y-%m-%d') if r.data_inicio else None,
        'hora': r.hora.strftime('%H:%M') if r.hora else None,
        'prioridade': r.prioridade,
        'status': r.status,
        'concluida': False,
        'tipo_periodo': r.tipo_perdiodo if hasattr(r, 'tipo_perdiodo') else None,
        'etiquetas': [{'id': None, 'nome': r.etiqueta, 'cor': '#888'}] if r.etiqueta else []
    }


@app.route('/api/rotinas', methods=['GET', 'POST', 'PUT'])
def api_rotinas():
    if 'usuario_id' not in session:
        return jsonify([]) if request.method == 'GET' else (jsonify({'error': 'unauthorized'}), 401)

    user_id = session['usuario_id']

    if request.method == 'GET':
        rotinas = Rotina.query.filter_by(usuario_id=user_id).all()
        return jsonify([serialize_rotina(r) for r in rotinas])

    # POST -> create
    data = request.get_json() or {}
    if request.method == 'POST':
        titulo = data.get('titulo') or 'Sem título'
        descricao = data.get('descricao')
        data_v = data.get('data_vencimento')
        hora = data.get('hora')
        prioridade = data.get('prioridade')
        etiquetas = data.get('etiquetas') or []

        from datetime import datetime, time
        data_inicio = None
        hora_obj = None
        try:
            if data_v:
                data_inicio = datetime.strptime(data_v, '%Y-%m-%d').date()
        except Exception:
            data_inicio = None
        try:
            if hora:
                hora_obj = datetime.strptime(hora, '%H:%M').time()
        except Exception:
            hora_obj = None

        tag_name = None
        tag_color = '#888'
        if etiquetas and isinstance(etiquetas, list) and len(etiquetas) > 0:
            tag_name = etiquetas[0].get('nome')
            tag_color = etiquetas[0].get('cor') or tag_color

        nova = Rotina(
            titulo=titulo,
            descricao=descricao,
            data_inicio=data_inicio,
            hora=hora_obj,
            prioridade=prioridade,
            etiqueta=tag_name,
            usuario_id=user_id
        )

        db.session.add(nova)

        # ensure etiqueta exists
        if tag_name:
            existing = EtiquetaModel.query.filter_by(nome=tag_name, usuario_id=user_id).first()
            if not existing:
                e = EtiquetaModel(nome=tag_name, cor=tag_color, usuario_id=user_id)
                db.session.add(e)

        db.session.commit()
        return jsonify(serialize_rotina(nova))

    # PUT -> update existing
    if request.method == 'PUT':
        data = request.get_json() or {}
        rid = data.get('id')
        if not rid:
            return jsonify({'error': 'missing id'}), 400
        rotina = Rotina.query.filter_by(id=int(rid), usuario_id=user_id).first()
        if not rotina:
            return jsonify({'error': 'not found'}), 404

        rotina.titulo = data.get('titulo') or rotina.titulo
        rotina.descricao = data.get('descricao') or rotina.descricao
        dv = data.get('data_vencimento')
        try:
            if dv:
                rotina.data_inicio = datetime.strptime(dv, '%Y-%m-%d').date()
        except Exception:
            pass
        hr = data.get('hora')
        try:
            if hr:
                rotina.hora = datetime.strptime(hr, '%H:%M').time()
        except Exception:
            pass
        rotina.prioridade = data.get('prioridade') or rotina.prioridade
        rotina.status = data.get('status') or rotina.status
        rotina.etiqueta = (data.get('etiquetas') or [{}])[0].get('nome') if data.get('etiquetas') else rotina.etiqueta

        db.session.commit()
        return jsonify(serialize_rotina(rotina))


@app.route('/api/etiquetas', methods=['GET', 'POST'])
def api_etiquetas():
    if 'usuario_id' not in session:
        return jsonify([]) if request.method == 'GET' else (jsonify({'error': 'unauthorized'}), 401)
    user_id = session['usuario_id']
    if request.method == 'GET':
        tags = EtiquetaModel.query.filter_by(usuario_id=user_id).all()
        return jsonify([{'id': t.id, 'nome': t.nome, 'cor': t.cor} for t in tags])
    data = request.get_json() or {}
    nome = data.get('nome')
    cor = data.get('cor') or '#888'
    if not nome:
        return jsonify({'error': 'missing nome'}), 400
    existing = EtiquetaModel.query.filter_by(nome=nome, usuario_id=user_id).first()
    if existing:
        return jsonify({'id': existing.id, 'nome': existing.nome, 'cor': existing.cor})
    newtag = EtiquetaModel(nome=nome, cor=cor, usuario_id=user_id)
    db.session.add(newtag)
    db.session.commit()
    return jsonify({'id': newtag.id, 'nome': newtag.nome, 'cor': newtag.cor})


@app.route('/api/usuario')
def api_usuario():
    if 'usuario_id' not in session:
        return jsonify({'logged_in': False}), 200
    user = User.query.get(session['usuario_id'])
    if not user:
        return jsonify({'logged_in': False}), 200
    return jsonify({'id': user.id, 'nome': user.nome, 'email': user.email, 'is_admin': user.email in ADMIN_EMAILS})


@app.route('/api/admin/users')
def api_admin_users():
    if not is_admin_user():
        return jsonify({'error': 'unauthorized'}), 401
    # return all users except those in ADMIN_EMAILS (do not show admin accounts)
    try:
        users = User.query.filter(User.email.notin_(ADMIN_EMAILS)).all()
    except Exception:
        # fallback: return all users and filter in Python if DB doesn't support notin_
        users = [u for u in User.query.all() if u.email not in ADMIN_EMAILS]
    out = []
    for u in users:
        ban = BannedUser.query.filter_by(user_id=u.id).first() is not None
        out.append({'id': u.id, 'nome': u.nome, 'email': u.email, 'banned': bool(ban), 'last_login': u.last_login.isoformat() if getattr(u, 'last_login', None) else None})
    return jsonify(out)


@app.route('/api/admin/banned')
def api_admin_banned():
    if not is_admin_user():
        return jsonify({'error': 'unauthorized'}), 401
    banned = BannedUser.query.all()
    out = []
    for b in banned:
        u = User.query.get(b.user_id)
        out.append({'user_id': b.user_id, 'email': u.email if u else None, 'nome': u.nome if u else None, 'reason': b.reason, 'banned_at': b.banned_at.isoformat()})
    return jsonify(out)


@app.route('/api/admin/action', methods=['POST'])
def api_admin_action():
    if not is_admin_user():
        return jsonify({'error': 'unauthorized'}), 401
    data = request.get_json() or {}
    action = data.get('action')
    uid = data.get('user_id')
    if not uid:
        return jsonify({'error': 'missing user_id'}), 400

    # delete user
    if action == 'delete':
        u = User.query.get(uid)
        if not u:
            return jsonify({'error': 'not found'}), 404
        # remove any ban entry
        ban = BannedUser.query.filter_by(user_id=uid).first()
        if ban:
            db.session.delete(ban)
        db.session.delete(u)
        db.session.commit()
        return jsonify({'success': True})

    # ban user
    if action == 'ban':
        reason = data.get('reason')
        existing = BannedUser.query.filter_by(user_id=uid).first()
        if existing:
            return jsonify({'success': True, 'banned': True})
        ban = BannedUser(user_id=uid, reason=reason)
        db.session.add(ban)
        db.session.commit()
        return jsonify({'success': True, 'banned': True})

    # unban user
    if action == 'unban':
        ban = BannedUser.query.filter_by(user_id=uid).first()
        if ban:
            db.session.delete(ban)
            db.session.commit()
        return jsonify({'success': True, 'banned': False})

    return jsonify({'error': 'invalid action'}), 400


@app.route('/api/configuracoes')
def api_configuracoes():
    # minimal defaults
    try:
        tema = state.preferences.theme
    except Exception:
        tema = 'light'
    return jsonify({
        'tema': tema,
        'notificacoes': False,
        'idioma': 'pt-BR',
        'fonte': 'Inter',
        'tamanho_fonte': 16,
        'mostrar_concluidas': True
    })


@app.route('/api/estatisticas')
def api_estatisticas():
    # minimal placeholder
    return jsonify({
        'total_rotinas': Rotina.query.count(),
        'rotinas_concluidas': Rotina.query.filter_by(status='done').count()
    })




@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    # Support both form POST and JSON API requests
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            nome = data.get('nome')
            email = data.get('email')
            senha = data.get('senha')
        else:
            nome = request.form.get('nome')
            email = request.form.get('email')
            senha = request.form.get('senha')

        if not nome or not email or not senha:
            if request.is_json:
                return jsonify(success=False, error='Campos incompletos'), 400
            flash('Preencha todos os campos.', 'warning')
            return redirect(url_for('cadastro'))

        if User.query.filter_by(email=email).first():
            if request.is_json:
                return jsonify(success=False, error='E-mail já cadastrado'), 400
            flash('E-mail já cadastrado!', 'warning')
            return redirect(url_for('cadastro'))

        senha_hash = generate_password_hash(senha)
        novo_usuario = User(nome=nome, email=email, senha_hash=senha_hash)
        db.session.add(novo_usuario)
        db.session.commit()

        if request.is_json:
            return jsonify(success=True)
        flash('Cadastro realizado! Faça login.', 'success')
        return redirect(url_for('login'))

    return render_template('cadastro.html')

@app.route('/home')
def home():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))

    usuario = User.query.get(session['usuario_id'])
    # Pass current server date/time to template so it displays immediately
    now = datetime.now()
    today_date = now.strftime('%d/%m/%Y')
    now_time = now.strftime('%H:%M')
    return render_template('inicio.html', usuario=usuario, today_date=today_date, now_time=now_time)

@app.route('/nova_rotina', methods=['GET', 'POST'])
def nova_rotina():
    if 'usuario_id' not in session:
        flash("Você precisa estar logado para criar uma rotina.")
        return redirect(url_for('login'))

    if request.method == 'POST':
        titulo = request.form['titulo']
        descricao = request.form.get('descricao', '')
        tipo_periodo = request.form.get('tipo_periodo', 'inicio_fim')
        data_inicio = datetime.strptime(request.form['data_inicio'], '%Y-%m-%d').date()
        data_fim = datetime.strptime(request.form['data_fim'], '%Y-%m-%d').date()
        dias_semana = ','.join(request.form.getlist('dias_semana'))
        hora_str = request.form.get('hora', None)
        hora = datetime.strptime(hora_str, '%H:%M').time() if hora_str else None
        prioridade = request.form.get('prioridade', 'média')
        etiqueta = request.form.get('etiqueta', '')

        nova = Rotina(
            titulo=titulo,
            descricao=descricao,
            tipo_periodo=tipo_periodo,
            data_inicio=data_inicio,
            data_fim=data_fim,
            dias_semana=dias_semana,
            hora=hora,
            prioridade=prioridade,
            etiqueta=etiqueta,
            usuario_id=session['usuario_id']
        )

        db.session.add(nova)
        db.session.commit()
        flash('Rotina criada com sucesso!')
        return redirect(url_for('hoje'))

    return render_template('index.html')

DATABASE = 'banco.db' # Mude para o nome do seu arquivo SQLite
def get_user_data(user_id):
    """Busca os dados do usuário no banco de dados SQLite."""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    # SELECT os campos. Você precisará de uma forma de identificar o usuário atual (ex: user_id)
    cursor.execute('SELECT username, email FROM users WHERE id = ?', (user_id,))
    data = cursor.fetchone() # Pega apenas o primeiro resultado
    conn.close()
    return data # Retorna (username, email) ou None

@app.route('/configuracoes')
def configuracoes():
    # Exibe as configurações do usuário logado
    if 'usuario_id' not in session:
        return redirect(url_for('login'))

    usuario = User.query.get(session['usuario_id'])
    if usuario:
        username = usuario.nome or usuario.userName if hasattr(usuario, 'userName') else usuario.nome
        email = usuario.email or ''
    else:
        username, email = 'Não encontrado', ''

    return render_template('configuracoes.html', username=username, email=email)

if __name__ == '__main__':
    app.run(debug=True)