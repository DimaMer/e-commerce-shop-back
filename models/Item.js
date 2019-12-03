const mongoose = require('mongoose');
const {Schema} = mongoose;


const ItemSchema = new Schema({
  nameTop:  { type: String },
  name:  { type: String },
  category:  { type: String },
  subCategory:  { type: String },
  reviews: [{ name: {type: String}, date: {type: String}, stars: {type: String}, text: {type: String}, status: {type: Boolean, required: true, default: false}}],
  stars:  { type: String },
  video: [{ type: String }],
  photoMain: [ { name: {type: String}}],
  photoSecond: [ { name: {type: String}}],
  photoClient: [{ name: {type: String}}],
  photoOther: [{ name: {type: String}}],
  photoCharacteristics: [{ name: {type: String},  name: {type: String}}],
  price: { type: String },
  discount: { type: String },
  dateAddItem: { type: Date, required: true, default: Date.now},
  statusItems: { type: Boolean, required: true, default: false }
});

const Item = mongoose.model('Item', ItemSchema);

exports.ItemSchema = ItemSchema
exports.Item = Item;
