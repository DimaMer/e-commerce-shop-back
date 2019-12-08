const mongoose = require('mongoose');
const {Schema} = mongoose;
// const {ReviewItem} = require('./ReviewItem');
const mongoosePaginate = require('mongoose-paginate');


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
  reviews: [{ type: Schema.Types.ObjectId, ref: 'ReviewItem' }],
  photo: [{ type: Schema.Types.ObjectId, ref: 'Gallery' }],
  // photo: [{url:{ type: String }, category:{ type: String }, idPhoto:{ type: Schema.Types.ObjectId}}]
// photo {url, id item, idphot, descr: main,  cli, other }
  // video: [{ type: String }],
  // photoMain: [{ name: {type: String}}],
  // photoSecond: [{ name: {type: String}}],
  // photoClient: [{ name: {type: String}}],
  // photoOther: [{ name: {type: String}}],
  // photoCharacteristics: [{ name: {type: String},  name: {type: String}}],
});
ItemSchema.plugin(mongoosePaginate);
const Item = mongoose.model('Item', ItemSchema);

exports.Item = Item;
