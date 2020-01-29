const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');
const {Category} = require('../models/Category');

const ItemSchema = new Schema({
  title: { type: String },
  titleUpper: { type: String },
  description: {type: String },
  titleLong: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  price: { type: Number },
  discount: { type: String },
  isPopular: {type: Boolean, default: false},
  stars: { type: Number },
  dateCreateItem: { type: Date, required: true, default: Date.now},
  statusItems: { type: Boolean, required: true, default: false },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'ReviewItem' }],
  photos: [{ type: Schema.Types.ObjectId, ref: 'Gallery' }],
  video: { type: String },

});
// ItemSchema.post(
//     "find", async function(doc) {
//       let a = await Category.findById(this.category)
//       console.log(111,doc.map(id=>id.category));
//       // const a= await Item.findByIdAndUpdate(doc.idItem, {$push: {photos: doc.id}}, {new: true});
//       // console.log('%s has been saved', a);
//     });
// ItemSchema.virtual('cat').get(function () {
//   console.log(1);
//   return this.category + ' ' + this.category;
// });

ItemSchema.plugin(mongoosePaginate);
const Item = mongoose.model('Item', ItemSchema);



// ItemSchema.virtual('cat').get(function () {
//   return this.category + ' ' + this.category;
// });


// ItemSchema.virtual('temp', {
//   ref: 'Category',
//   localField: 'subCategory',
//   foreignField: '_id',
//   justOne: true
// });



exports.Item = Item;
exports.ItemSchema = ItemSchema;
