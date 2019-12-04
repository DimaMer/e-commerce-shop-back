const mongoose = require('mongoose');
const {Schema} = mongoose;

const ItemSchema = new Schema({
  nameTop: { type: String },
  name: { type: String, required: true },
  category: { type: String, default: 'unCategory' },
  subCategory: { type: String, default: 'unSubCategory' },
  price: { type: String },
  discount: { type: String },
  stars: { type: String },
  dateAddItem: { type: Date, required: true, default: Date.now},
  statusItems: { type: Boolean, required: true, default: false },

  // reviews: [{ name: {type: String}, stars: {type: String}, text: {type: String}, date: {type: Date, required: true, default: Date.now}, status: {type: Boolean, required: true, default: false}}],

  // video: [{ type: String }],
  // photoMain: [{ name: {type: String}}],
  // photoSecond: [{ name: {type: String}}],
  // photoClient: [{ name: {type: String}}],
  // photoOther: [{ name: {type: String}}],
  // photoCharacteristics: [{ name: {type: String},  name: {type: String}}],
});

const Item = mongoose.model('Item', ItemSchema);

exports.Item = Item;
