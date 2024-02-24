const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuración de bodyParser para analizar el cuerpo de las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Para servir archivos estáticos

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Importación de rutas de empleados
const empleadosRoutes = require('./routes/empleados');
app.use('/empleados', empleadosRoutes);

app.get('/', (req, res) => { //request, response
  res.redirect('/empleados');
});

//Version 2.0 del codigo con AJAX
const empleadosRoutesv2 = require('./routes/empleadosv2');
app.use('/empleadosv2', empleadosRoutesv2);


app.get('/empleadosv2', (req, res) => {
    res.render('empleadosv2');
  });

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

