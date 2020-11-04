'use strict'

// cargo el modulo y tengo disponible 
// el objeto de express para trabajar
var express = require('express');

// cargo el modulo de bodyParser para la 
// conversion de peticiones HTTP a Json
var bodyParser = require('body-parser');

var app = express();

//--------------  archivos de rutas --------------//
var product_routes = require('./routes/product');

//----------------- middlewares ----------------//

// esto es una simplemente una conf necesaria para bodyParser
app.use(bodyParser.urlencoded({extended: false}));
// cualquier tipo de petición que llegue la convierte a json
app.use(bodyParser.json());

//----------------- cors ----------------//

//----------------- rutas ----------------//
// en este caso le añadimos "api" a la url de petición 
app.use('/api', product_routes);


// ruta get de prueba  


// exporto el modulo 
module.exports = app;