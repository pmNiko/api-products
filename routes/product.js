'use strict'
// importo express para la creaciñon de rutas
var express = require('express');
const { route } = require('../app');
// importo mi controlador de product
var ProductController = require('../controllers/product');

// cargo el modulo de Router() que nos brinda express
var router = express.Router();

// creación de las rutas que 
// cargaran los metodos del controller 
router.get('/home', ProductController.home);
router.post('/test', ProductController.test);
router.post('/save-product', ProductController.saveProduct);

module.exports = router;