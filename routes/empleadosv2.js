const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbPath = './db/empleadosDB.sqlite';

// Ruta modificada para obtener empleados en formato JSON
router.get('/api', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all("SELECT * FROM empleados", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ empleados: rows });
    }
  });
  db.close();
});

// Ruta modificada para añadir o actualizar un empleado via AJAX
router.post('/api/save', (req, res) => {
  const { id, nombre, puesto, email } = req.body;
  const db = new sqlite3.Database(dbPath);
  if (id) {
    const sql = `UPDATE empleados SET nombre = ?, puesto = ?, email = ? WHERE id = ?`;
    db.run(sql, [nombre, puesto, email, id], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Empleado actualizado', empleado: { id, nombre, puesto, email } });
      }
    });
  } else {
    const sql = `INSERT INTO empleados (nombre, puesto, email) VALUES (?, ?, ?)`;
    db.run(sql, [nombre, puesto, email], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Empleado añadido', empleado: { nombre, puesto, email } });
      }
    });
  }
  db.close();
});

// Ruta modificada para eliminar un empleado via AJAX
router.delete('/api/delete/:id', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const sql = 'DELETE FROM empleados WHERE id = ?';
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Empleado eliminado' });
    }
  });
  db.close();
});

module.exports = router;
