const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubCategorySchema = new Schema({
  name: { type:{ ua: String, ru: String, en: String }, required: true },
  subCatId: { type: String },
});

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

exports.SubCategorySchema = SubCategorySchema
exports.SubCategory = SubCategory;
