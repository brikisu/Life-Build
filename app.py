from flask import Flask, jsonify, request, session, render_template
from flask_cors import CORS
import sqlite3
import hashlib

app = Flask(__name__)
app.secret_key = 'lifebuild_secret_key_2025'
CORS(app)

# Configurar para aceitar JSON
app.config['JSON_SORT_KEYS'] = False

@app.before_request
def handle_json():
    """Middleware para garantir que JSON seja processado corretamente"""
    if request.method == 'POST':
        # Se o Content-Type não for JSON mas os dados forem JSON, ajusta
        if not request.is_json and request.data:
            try:
                request.json = request.get_json(force=True)
            except:
                pass

# ====== BANCO DE DADOS INTEGRADO ======

class lifebuildDB:
    def __init__(self, db_name="lifebuild.db"):
        self.db_name = db_name
        self.init_database()
    
    def init_database(self):
        """Inicializa o banco de dados com todas as tabelas necessárias"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        # Tabela de usuários
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nomeUsuario TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')

        cursor.execute('''
        CREATE TABLE IF NOT EXISTS rotinas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            periodo TEXT NOT NULL,
            dataInicio TIMESTAMP NOT NULL,
            dataFim TIMESTAMP NOT NULL,
            diasSemana TIMESTAMP,
            hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            prioridade INTEGER NOT NULL,
            etiqueta TEXT,
            status TEXT NOT NULL DEFAULT 'Pendente',    
            usuarioId INTEGER NOT NULL,
            FOREIGN KEY (usuarioId) REFERENCES users(id)
        )''')

        cursor.execute('''
        CREATE TABLE IF NOT EXISTS etiquetas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE,
            cor TEXT NOT NULL,
            usuarioId INTEGER NOT NULL,
            FOREIGN KEY (usuarioId) REFERENCES users(id)
        )''')

        conn.commit()
        conn.close()
        print("✅ Banco de dados inicializado com sucesso!")

    def hash_senha(self, senha):
        """Gera um hash seguro para a senha do usuário"""
        return hashlib.sha256(senha.encode()).hexdigest()
    
    def verificar_senha(self, senha, senha_hash):
        """Verifica se a senha corresponde ao hash"""
        return self.hash_senha(senha) == senha_hash
    
    def criar_usuario(self, nome, email, senha):
        """Cria um novo usuário no banco de dados"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        try:
            senha_hash = self.hash_senha(senha)
            cursor.execute('''
                INSERT INTO users (nomeUsuario, email, senha)
                VALUES (?, ?, ?)
            ''', (nome, email, senha_hash))
            
            conn.commit()
            usuario_id = cursor.lastrowid
            print(f"Usuário criado com ID: {usuario_id}")
            return usuario_id
        except sqlite3.IntegrityError as e:
            print(f"Erro de integridade: {str(e)}")
            return None
        except Exception as e:
            print(f"Erro ao criar usuário: {str(e)}")
            raise
        finally:
            conn.close()
    
    def verificar_login(self, email, senha):
        """Verifica as credenciais de login"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, nomeUsuario, senha FROM users WHERE email = ?', (email,))
        resultado = cursor.fetchone()
        conn.close()
        
        if resultado and self.verificar_senha(senha, resultado[2]):
            return {"id": resultado[0], "nome": resultado[1]}
        return None
    
    def obter_usuario(self, usuario_id):
        """Obtém dados do usuário pelo ID"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, nomeUsuario, email, dataCadastro
            FROM users WHERE id = ?
        ''', (usuario_id,))
        
        usuario = cursor.fetchone()
        conn.close()
        
        if usuario:
            return {
                "id": usuario[0],
                "nomeUsuario": usuario[1],
                "email": usuario[2]
            }
        return None
    
db = lifebuildDB()

# ====== ROTAS DA APLICAÇÃO ======
@app.route('/api')
def home():
    return jsonify({
        "message": "Life Build - Online", 
        "status": "success",
        "endpoints": {
            "login": "login (POST)",
            "cadastro": "cadastro (POST)",
        }
    })

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        senha = data.get('senha')
        
        if not email or not senha:
            return jsonify({"success": False, "error": "E-mail e senha são obrigatórios"}), 400
        
        usuario = db.verificar_login(email, senha)
        
        if usuario:
            session['usuario_id'] = usuario['id']
            session['nomeUsuario'] = usuario['nome']
            
            return jsonify({
                "success": True,
                "usuario": {
                    "id": usuario['id'],
                    "nome": usuario['nome'],
                    "email": email
                },
                "message": "Login realizado com sucesso"
            })
        else:
            return jsonify({"success": False, "error": "E-mail ou senha incorretos"}), 401
            
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/cadastro', methods=['POST'])
def cadastro():
    try:
        # Aceita tanto JSON quanto form data
        if request.is_json:
            data = request.json
        else:
            data = request.form.to_dict()
        
        print(f"Dados recebidos: {data}")
        
        required_fields = ['nome', 'email', 'senha']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"success": False, "error": f"Campo {field} é obrigatório"}), 400
        
        usuario_id = db.criar_usuario(
            nome=data['nome'],
            email=data['email'],
            senha=data['senha'],
        )
        
        print(f"Usuário ID retornado: {usuario_id}")
        
        if usuario_id:
            # Fazer login automático após cadastro
            session['usuario_id'] = usuario_id
            session['nomeUsuario'] = data['nome']
            
            return jsonify({
                "success": True,
                "usuario_id": usuario_id,
                "message": "Cadastro realizado com sucesso"
            })
        else:
            return jsonify({"success": False, "error": "E-mail já cadastrado"}), 400
            
    except Exception as e:
        print(f"Erro no cadastro: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

# ====== ROTAS PARA PÁGINAS HTML ======
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cadastro-page')
def cadastro_page():
    return render_template('cadastro.html')

@app.route('/inicio.html')
@app.route('/inicio')
def inicio():
    return render_template('inicio.html')

if __name__ == '__main__':
    print("🚀 Iniciando servidor LifeBuild...")
    print("📊 Banco de dados: lifebuild.db")
    print("🌐 Servidor disponível em: http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000) 