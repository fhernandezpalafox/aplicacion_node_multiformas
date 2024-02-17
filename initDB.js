const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/empleadosDB.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS empleados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    puesto TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`);
});

db.close();
