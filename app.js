"use strict";

// cargo el modulo y tengo disponible
// el objeto de express para trabajar
var express = require("express");

// cargo el modulo de bodyParser para la
// conversion de peticiones HTTP a Json
var bodyParser = require("body-parser");

var app = express();

//--------------  archivos de rutas --------------//
var product_routes = require("./routes/product");

//----------------- middlewares ----------------//

// esto es una simplemente una conf necesaria para bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
// cualquier tipo de petición que llegue la convierte a json
app.use(bodyParser.json());

//----------------- cors ----------------//
// Configuración de cabeceras y cors
app.use((req, res, next) => {
  // Al publicar la api reemplazariasmos el * por la url permitida
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//----------------- rutas ----------------//
// en este caso le añadimos "api" a la url de petición
app.use("/api", product_routes);

// ruta get de prueba

// exporto el modulo
module.exports = app;
