from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=False)

    rotinas = db.relationship('Rotina', backref='usuario', lazy=True)


class Rotina(db.Model):
    __tablename__ = 'rotinas'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(255), nullable=True)
    tipo_perdiodo = db.Column(db.String(50))
    data_inicio = db.Column(db.Date)
    data_fim = db.Column(db.Date)
    dias_semana = db.Column(db.String(100))
    hora = db.Column(db.Time)
    prioridade = db.Column(db.String(50))
    etiqueta = db.Column(db.String(50))
    status = db.Column(db.String(50), default='pendente')

    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
