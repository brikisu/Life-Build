from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Rotina, etiquetas as EtiquetaModel
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


@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    # Support both form POST and JSON API requests
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            email = data.get('email')
            senha = data.get('senha')
        else:
            email = request.form.get('email')
            senha = request.form.get('senha')

        usuario = User.query.filter_by(email=email).first()

        if usuario and check_password_hash(usuario.senha_hash, senha):
            session['usuario_id'] = usuario.id
            # If JSON request, return JSON response
            if request.is_json:
                return jsonify(success=True)
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('home'))
        else:
            if request.is_json:
                return jsonify(success=False), 401
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
    return jsonify({'id': user.id, 'nome': user.nome, 'email': user.email})


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