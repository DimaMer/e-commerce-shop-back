const mongoose = require('mongoose');
const { Schema } = mongoose;
const { SubCategorySchema } = require('../models/SubCategory');

const CategorySchema = new Schema({
  name: { type:{ ua: {type: String, required: true}, ru: {type: String, required: true}, en: {type: String, required: true}}, required: true },
  catId: { type: String, required: true },
  subCategorys: [{ type: SubCategorySchema }]
});

const Category = mongoose.model('Category', CategorySchema);
exports.Category = Category;
