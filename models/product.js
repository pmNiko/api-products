'use strict'

var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);
// cargo el obj de Schema desde mongoose
var Schema = mongoose.Schema;

// creo el schema de Product
var ProductSchema = Schema({
    "name" : String,
    "category" : String,
    "sub_category" : String,
    "description" : String,
    "quantity" : Number,
    "price" : { type: Float },
    "image" : String
    // array: [String] si necesitara un array de strings
});

/*  Exportación del model pasando como parametros 
    primero la entidad en singular de la colección
    y segundo nuestro schema de la entidad */
module.exports = mongoose.model( 'Product', ProductSchema);