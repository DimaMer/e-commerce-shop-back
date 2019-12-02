const mongoose = require('mongoose');
const {Schema} = mongoose;

const ItemSchema = new Schema({
  nameGroup: { type: String, required: true },
  descriptionGroup:  { type: String },
  nameItem: { type: String },
  descriptionItem: { type: String, required: true },
  costItem: { type: String, required: true },
  countItems: { type: String, required: true },
  dateAddItem: { type: Date, required: true, default: Date.now},
  statusItems: { type: Boolean, required: true, default: false }
});

const Item = mongoose.model('Item', ItemSchema);

exports.Item = Item;
