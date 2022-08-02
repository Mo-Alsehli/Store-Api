const Products = require("../models/product");

const getAllProductsStatic = (req, res) => {
  res.status(200).json({ msg: "Products Static Router" });
};

const getAllProducts = async (req, res) => {
  // Filtering Products

  const { featured, company, name, sort } = req.query;
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

  let result = Products.find(queryObject);
  if (sort) {
    let sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
