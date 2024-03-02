const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuración de bodyParser para analizar el cuerpo de las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));// Para servir archivos estáticos

app.use(express.json());


// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Importación de rutas de empleados
const empleadosRoutes = require('./routes/empleados');
app.use('/empleados', empleadosRoutes);
//Version 2.0 del codigo con AJAX
const empleadosRoutesv2 = require('./routes/empleadosv2');
app.use('/empleadosv2', empleadosRoutesv2);

const usuariosRoutes = require('./routes/usuarios');
app.use('/api', usuariosRoutes); 

const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes); 


app.get('/', (req, res) => { //request, response
  res.redirect('/login'); //empleados
});

app.get('/empleadosv2', (req, res) => {
  res.render('empleadosv2');
});



// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

