const categoryModel = require('../models/Category');
const mapCategory = require('../mappers/category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const res = await categoryModel.find({}).populate({path: 'subcategories'});
  const categories = res.map((item) => mapCategory(item));
  
  ctx.body = {categories};
};
