"use strict";

// importamos el modelo de la entidad Product
var Product = require("../models/product");
// importación de file sistem de node js
var fs = require("fs");

const controller = {
  //---- Guardar un Producto Nuevo ----//
  saveProduct: function (req, res) {
    var product = new Product();

    // Destructuring del objeto req.body
    var {
      name,
      category,
      sub_category,
      description,
      quantity,
      price,
    } = req.body;
    // Asignación de valores al objeto
    (product.name = name),
      (product.category = category),
      (product.sub_category = sub_category),
      (product.description = description),
      (product.quantity = quantity),
      (product.price = price),
      (product.image = null);

    // Utilizamos la función save() que tiene asociada product
    // la cual tendra como respuesta un error o el obj guardado
    product.save((error, product) => {
      if (error)
        return res.status(500).send({
          message: "Error en la petición al servidor!",
        });
      if (!product)
        return res.status(404).send({
          message: "Error al guardar el producto!",
        });
      console.log(product);
      return res.status(200).send({ product_id: product._id });
    });
  },

  //---- Buscar un Producto por parametro ----//
  getProduct: function (req, res) {
    // capturo el id que llega por params
    var productId = req.params.id;

    // chequeo que no sea null
    if (productId == null)
      return res.status(404).send({
        message: "No coloco el id de producto!",
      });

    // Busco el producto por id
    Product.findById(productId, (error, product) => {
      if (error)
        return res.status(500).send({
          message: "Error en la petición al servidor!",
        });
      if (!product)
        return res.status(404).send({
          message: "El producto no existe!",
        });
      return res.status(200).send({ product });
    });
  },

  //---- Devolver todos los productos ----//
  getProducts: function (req, res) {
    Product.find({}).exec((error, products) => {
      if (error)
        return res.status(500).send({
          message: "Error en la petición al servidor!",
        });
      if (!products)
        return res.status(404).send({
          message: "No hay productos que mostrar!",
        });
      return res.status(200).send({ products });
    });
  },

  //---- Actualizar un Producto por parametro ----//
  updateProduct: function (req, res) {
    var productId = req.params.id;
    var update = req.body;
    // Recibe el id que viene por params, los datos de actualización
    // y la variante {new:true} es para que devuelva el objeto actualizado
    Product.findByIdAndUpdate(
      productId,
      update,
      { new: true },
      (error, product) => {
        if (error)
          return res.status(500).send({
            message: "Error en la petición al servidor!",
          });
        if (!product)
          return res.status(404).send({
            message: "Error al actualizar!",
          });
        return res.status(200).send({ product });
      }
    );
  },

  //---- Borrar un Producto por parametro ----//
  deleteProduct: function (req, res) {
    var productId = req.params.id;

    Product.findByIdAndDelete(productId, (error, product) => {
      if (error)
        return res.status(500).send({
          message: "Error en la petición al servidor!",
        });
      if (!product)
        return res.status(404).send({
          message: "Error al borrar!",
        });
      return res.status(200).send({ product });
    });
  },

  //---- Subir una imagen a un Producto ----//
  uploadImage: function (req, res) {
    var product_id = req.params.id;
    var fileName = "Imagen no seleccionada...";

    //  capturamos el fichero con connect-multiparty
    if (req.files) {
      var filePath = req.files.image.path; //path
      var fileSplit = filePath.split("/"); //split
      var fileName = fileSplit[1]; //ref en la posición 1

      var extSplit = fileName.split(".");
      var fileExt = extSplit[1];

      // Validación de la extención de la imagen
      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        // Guardado en la BD //
        Product.findByIdAndUpdate(
          product_id, // id del producto
          { image: fileName }, // propiedad a modificar
          { new: true }, // devuelve el obj modificado
          (error, product) => {
            if (error)
              return res.status(500).send({
                message: "Error en la petición al servidor!",
              });
            if (!product)
              return res.status(404).send({
                message: "Error al subir imagen!",
              });
            return res.status(200).send({
              product: product,
            });
          }
        );
      } else {
        // sino tiene una ext permitida la borro
        fs.unlink(filePath, (error) => {
          return res.status(200).send({ message: "extención no valida" });
        });
      }
    } else {
      // si no existe req.files devuelve un mensaje de error
      return res.status(200).send({ message: fileName });
    }
  },

  //---- Funciones de prueba ----//
  home: function (req, res) {
    return res.status(200).send({
      message: "Home de la app de backend",
    });
  },
  test: function (req, res) {
    return res.status(200).send({
      message: "Test de la app de backend",
    });
  },
};

module.exports = controller;
