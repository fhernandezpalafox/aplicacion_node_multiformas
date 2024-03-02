const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/empleadosDB.sqlite');

db.serialize(() => {
  // Elimina la tabla si ya existe
  db.run(`DROP TABLE IF EXISTS usuarios`);

  // Crea la tabla
  db.run(`
    CREATE TABLE usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      rol TEXT,
      password TEXT
    )
  `);
});

db.close();
