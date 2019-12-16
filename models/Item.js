const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');


const ItemSchema = new Schema({
  title: { type: String },
  titleLong: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  price: { type: Number },
  discount: { type: String },
  isPopular: {type: Boolean, default: false},
  stars: { type: String },
  dateCreateItem: { type: Date, required: true, default: Date.now},
  statusItems: { type: Boolean, required: true, default: false },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'ReviewItem' }],
  photos: [{ type: Schema.Types.ObjectId, ref: 'Gallery' }],
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
