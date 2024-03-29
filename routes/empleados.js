const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbPath = './db/empleadosDB.sqlite';

// Ruta principal para mostrar la lista de empleados y el formulario de ingreso
router.get('/', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all("SELECT * FROM empleados", [], (err, rows) => {
    if (err) {
      throw err;
    }
    // Pasar 'empleados' y un objeto 'empleadoSeleccionado' vacío si no estamos editando
    res.render('empleados', { empleados: rows, empleadoSeleccionado: {} });
  });
  db.close();
});

// Ruta para añadir o actualizar un empleado
router.post('/save', (req, res) => {
  const { id, nombre, puesto, email } = req.body;
  const db = new sqlite3.Database(dbPath);
  if (id) {
    // Actualizar un empleado existente
    const sql = `UPDATE empleados SET nombre = ?, puesto = ?, email = ? WHERE id = ?`;
    db.run(sql, [nombre, puesto, email, id], function(err) {
      if (err) {
        return console.error(err.message);
      }
      res.redirect('/empleados');
    });
  } else {
    // Añadir un nuevo empleado
    const sql = `INSERT INTO empleados (nombre, puesto, email) VALUES (?, ?, ?)`;
    db.run(sql, [nombre, puesto, email], function(err) {
      if (err) {
        return console.error(err.message);
      }
      res.redirect('/empleados');
    });
  }
  db.close();
});

// Ruta para eliminar un empleado
router.get('/delete/:id', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const sql = 'DELETE FROM empleados WHERE id = ?';
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.redirect('/empleados');
  });
  db.close();
});

module.exports = router;
