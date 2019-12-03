const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ItemSchema} = require('./Item')

const CategoryItemSchema = new Schema({
  nameCategory: { type: String, required: true },
  item: [{ type: ItemSchema }]
});

const CategoryItem = mongoose.model('CategoryItem', CategoryItemSchema);

exports.CategoryItem = CategoryItem;
