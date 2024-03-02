var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment =  require('moment');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/empleadosDB.sqlite');

//Creación del Token expira en 10 horas
const createToken = (user) => {
    let payload = {
      userId: user.id,
      rol: user.rol,
      createdAt: moment().unix(),
      expiresAt: moment().add(10,'hours').unix()
    }
    return jwt.encode(payload,process.env.TOKEN_KEY);
  };


  // Pagina principal
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
  });


  router.post('/autenticacion', function(req, res, next) {
    const username = req.body.usuario;
    const password = req.body.password;

    // Comprueba si el usuario existe en la base de datos
    db.get('SELECT * FROM usuarios WHERE nombre = ?', [username], (err, user) => {
        if (err) {
            res.status(500).json({
                error: 'Error interno, por favor intente más tarde',
                numero: '000'
            });
        } else if (!user) {
            res.json({
                error: 'Error, usuario y/o contraseña incorrectos',
                numero: '001'
            });
        } else {
            // Compara la contraseña proporcionada con la almacenada en la base de datos
            const equals = bcrypt.compareSync(password, user.password);
            if (!equals) {
                res.json({
                    error: 'Error, usuario y/o contraseña incorrectos',
                    numero: '002'
                });
            } else {
                res.json({
                    succesfull: createToken(user),
                    done: 'Login Correcto',
                    numero: '003',
                    nombre: user.nombre,
                    rol: user.rol,
                });
            }
        }
    });
});


module.exports = router;