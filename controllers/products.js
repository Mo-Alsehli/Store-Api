const Products = require("../models/product");

const getAllProductsStatic = (req, res) => {
  res.status(200).json({ msg: "Products Static Router" });
};

const getAllProducts = async (req, res) => {
  // Filtering Products

  const { featured, company, name, sort, fields } = req.query;
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

  // Sorting Results
  if (sort) {
    let sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // Selecting Specific Fileds
  if (fields) {
    let fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
