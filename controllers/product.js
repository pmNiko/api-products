"use strict";

// importamos el modelo de la entidad Product
var Product = require("../models/product");
// importación de file sistem de node js
var fs = require("fs");

const controller = {
  //---- Guardar un Producto Nuevo ----//
  saveProduct: function (req, res) {
    const product = new Product();

    // Destructuring del objeto req.body
    const {
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
      resServer(res, error, product);
    });
  },

  //---- Buscar un Producto por parametro ----//
  getProduct: function (req, res) {
    // capturo el id que llega por params
    const productId = req.params.id;

    // chequeo que no sea null
    if (productId == null)
      return res.status(404).send({
        message: "No coloco el id de producto!",
      });

    // Busco el producto por id
    Product.findById(productId, (error, product) => {
      resServer(res, error, product);
    });
  },

  //---- Devolver todos los productos ----//
  getProducts: function (req, res) {
    Product.find({}).exec((error, products) => {
      resServer(res, error, products);
    });
  },

  //---- Actualizar un Producto por parametro ----//
  updateProduct: function (req, res) {
    const productId = req.params.id;
    const update = req.body;
    // Recibe el id que viene por params, los datos de actualización
    // y la variante {new:true} es para que devuelva el objeto actualizado
    Product.findByIdAndUpdate(
      productId,
      update,
      { new: true },
      (error, product) => {
        resServer(res, error, product);
      }
    );
  },

  //---- Borrar un Producto por parametro ----//
  deleteProduct: function (req, res) {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId, (error, product) => {
      resServer(res, error, product);
    });
  },

  //---- Subir una imagen a un Producto ----//
  uploadImage: function (req, res) {
    const product_id = req.params.id;
    const fileName = "Imagen no seleccionada...";

    //  capturamos el fichero con connect-multiparty
    if (req.files) {
      let filePath = req.files.image.path; //path
      let fileSplit = filePath.split("/"); //split
      let fileName = fileSplit[1]; //ref en la posición 1

      let extSplit = fileName.split(".");
      let fileExt = extSplit[1];

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
            resServer(res, error, product);
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
};

module.exports = controller;

// ---- Funciones ----- //

/*
  Esta función abstrae la respuesta del servidor
*/
function resServer(res, error, recurso) {
  if (error)
    return res.status(500).send({
      message: "Error en la petición al servidor! error 500",
    });
  if (!recurso)
    return res.status(404).send({
      message: "Recurso no encontrado error 404!",
    });
  console.log(recurso);

  return res.status(200).send({ data: recurso });
}
