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
router.get('/product/:id?', ProductController.getProduct);
router.get('/products', ProductController.getProducts);
router.put('/update-product/:id', ProductController.updateProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);

module.exports = router;