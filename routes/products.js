const express = require("express");
const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products");

const productsRouter = express.Router();

productsRouter.route("/").get(getAllProducts);
productsRouter.route("/static").get(getAllProductsStatic);

module.exports = productsRouter;
