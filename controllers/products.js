const Products = require("../models/product");

const getAllProductsStatic = (req, res) => {
  res.status(200).json({ msg: "Products Static Router" });
};

const getAllProducts = async (req, res) => {
  // Filtering Products

  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  const products = await Products.find(queryObject);
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
