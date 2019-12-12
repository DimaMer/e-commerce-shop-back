const mongoose = require('mongoose');
const { Schema } = mongoose;
const { SubCategorySchema } = require('../models/SubCategory');

const CategorySchema = new Schema({
  name: { type: String, required: true },
  catId: { type: String, required: true },
  subCategorys: [{ type: SubCategorySchema }]
});

const Category = mongoose.model('Category', CategorySchema);
exports.Category = Category;
