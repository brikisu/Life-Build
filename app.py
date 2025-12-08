from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User,Rotina
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
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']

        usuario = User.query.filter_by(email=email).first()

        if usuario and check_password_hash(usuario.senha_hash, senha):
            session['usuario_id'] = usuario.id
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('home'))
        else:
            flash('E-mail ou senha incorretos.', 'danger')

    return render_template('index.html')

@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        senha = request.form['senha']

        if User.query.filter_by(email=email).first():
            flash('E-mail já cadastrado!', 'warning')
            return redirect(url_for('cadastro'))

        senha_hash = generate_password_hash(senha)
        novo_usuario = User(nome=nome, email=email, senha_hash=senha_hash)
        db.session.add(novo_usuario)
        db.session.commit()

        flash('Cadastro realizado! Faça login.', 'success')
        return redirect(url_for('login'))

    return render_template('cadastro.html')

@app.route('/home')
def home():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))

    usuario = User.query.get(session['usuario_id'])
    return render_template('inicio.html', usuario=usuario)

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
    # Em uma aplicação real, você obteria o user_id da sessão do usuário logado
    user_id_logado = 1 # Exemplo
    user_data = get_user_data(user_id_logado)

    if user_data:
        username, email = user_data
    else:
        username, email = 'Não encontrado', 'naoencontrado@email.com'

    # Renderiza o HTML, passando as variáveis de dados
    return render_template('configuracoes.html', username=username, email=email)

if __name__ == '__main__':
    app.run(debug=True)