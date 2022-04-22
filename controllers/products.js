const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regx: name, $options: "i" };
  }

  let products = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    products = products.sort(sortList);
  } else {
    products = products.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    products = products.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  products = products.limit(limit).skip(skip);

  res.status(200).json({ msg: products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: " products route" });
};
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
