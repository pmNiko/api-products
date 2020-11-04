'use strict'
// requiero mongoose y lo contengo en una var
var mongoose = require('mongoose');

// requiero el app.js e indico un puerto
var app = require('./app');
var port = 3700;


/*  conectar con la BD "gondola" indico que 
    sera una promesa. Luego conecto con la 
    url local donde estará escuchando la bd */ 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/gondola')
    .then(() => {
        console.log('Conexion a la base de datos establecida con exito!');
        // creación del servidor
        app.listen(port, () => {
           console.log('Servidor corriendo en la url: localhost:3700'); 
        });
    })
    .catch((e) => console.log(e));

