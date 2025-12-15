from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=False)
    last_login = db.Column(db.DateTime, nullable=True)
    

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

    # Backwards-compatible alias for the typo in older code/serializers
    @property
    def tipo_periodo(self):
        return getattr(self, 'tipo_perdiodo', None)

    @tipo_periodo.setter
    def tipo_periodo(self, value):
        self.tipo_perdiodo = value

class etiquetas(db.Model):
    __tablename__ = 'etiquetas'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)
    cor = db.Column(db.String(20), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)

# Provide a clear alias `Etiqueta` so importing code can use either name
Etiqueta = etiquetas


class BannedUser(db.Model):
    __tablename__ = 'banned_users'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False, unique=True)
    reason = db.Column(db.String(255), nullable=True)
    banned_at = db.Column(db.DateTime, default=datetime.utcnow)

    usuario = db.relationship('User', backref=db.backref('ban_entry', uselist=False))


class ResetToken(db.Model):
    __tablename__ = 'reset_tokens'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    token = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    used = db.Column(db.Boolean, default=False)

    usuario = db.relationship('User', backref=db.backref('reset_tokens', lazy='dynamic'))
    