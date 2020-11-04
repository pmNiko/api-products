'use strict'

// importamos el modelo de la entidad Product
var Product = require('../models/product');

const  controller =  {
    // Metodo para guardar un Producto
    saveProduct: function(req,res){
        var product = new Product();

        // Destructuring del objeto req.body
        var {name,category,sub_category,description,quantity,price} = req.body;
        // Asignación de valores al objeto
        product.name = name,
        product.category = category,
        product.sub_category = sub_category,
        product.description = description,
        product.quantity = quantity,
        product.price = price,
        product.image = null;

        // Utilizamos la función save() que tiene asociada product
        // la cual tendra como respuesta un error o el obj guardado
        product.save((error, productStored) => {
            if (error) return res.status(500)
                .send({message: 'Error en la petición al servidor!'});
            if (!productStored) return res.status(404)
                .send({message: 'Error al guardar el producto!'});                
            return res.status(200).send({product: productStored});
        });
    },


    home: function(req, res){
        return res.status(200).send({
            message: 'Home de la app de backend'
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message: 'Test de la app de backend'
        });
    }    
};

module.exports = controller;
