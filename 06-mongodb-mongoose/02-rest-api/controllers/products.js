const producModel = require('../models/Product');
const mapProduct = require('../mappers/product');
const mongoose = require('mongoose');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;

  if (!subcategory) return next();

  const products = await producModel.find({subcategory});
  // const products = res.map((item) => mapProduct(item));


  if (!products.length) {
    ctx.body = {products: []};
  }

  ctx.body = {products};
};

module.exports.productList = async function productList(ctx, next) {
  const res = await producModel.find({});

  if (!res.length) {
    ctx.body = [];
  }

  const products = res.map((item) => mapProduct(item));
  ctx.body = {products};
};

module.exports.productById = async function productById(ctx, next) {
  const producId = ctx.params.id;

  if (!mongoose.isValidObjectId(producId)) {
    ctx.throw(400, 'ID is invalid.');
  }

  const res = await producModel.findById(producId);

  if (!res) {
    ctx.throw(404, 'Product not found.');
  }

  const product = mapProduct(res);
  ctx.body = {product};
};

