import sqlite3
from pathlib import Path
import json

DB = Path(__file__).resolve().parents[1] / 'banco.db'
if not DB.exists():
    print('banco.db não encontrado em', DB)
    raise SystemExit(1)

conn = sqlite3.connect(str(DB))
conn.row_factory = sqlite3.Row
cur = conn.cursor()
try:
    cur.execute('SELECT id, nome, email, last_login FROM usuarios')
    rows = cur.fetchall()
    out = []
    for r in rows:
        out.append({'id': r['id'], 'nome': r['nome'], 'email': r['email'], 'last_login': r['last_login']})
    print(json.dumps(out, indent=2, ensure_ascii=False))
except Exception as e:
    print('Erro ao consultar usuarios:', e)
finally:
    conn.close()
