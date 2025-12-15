import sqlite3
from pathlib import Path

DB = Path(__file__).resolve().parents[1] / 'banco.db'
if not DB.exists():
    raise SystemExit(f'banco.db não encontrado em: {DB}')

conn = sqlite3.connect(str(DB))
cur = conn.cursor()
cols = [r[1] for r in cur.execute("PRAGMA table_info(usuarios)").fetchall()]
if 'last_login' not in cols:
    cur.execute("ALTER TABLE usuarios ADD COLUMN last_login DATETIME")
    conn.commit()
    print("Coluna last_login adicionada com sucesso.")
else:
    print("Coluna last_login já existe.")
conn.close()