const productModel = require('../models/Product');
const mapProduct = require('../mappers/product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const {query} = ctx.query;

  const res = await productModel.find({$text: {$search: `${query}`}});

  if (!res) {
    ctx.throw(404, 'Product not found.');
  }

  const products = res.map((item) => {
    return mapProduct(item);
  });

  ctx.body = {products};
};
