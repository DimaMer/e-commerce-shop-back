const mongoose = require('mongoose');
const {Schema} = mongoose;
const {Item} = require('./Item');

const GallerySchema = new Schema({
  photo: { type: String, required: true },
  idItem:{ type: Schema.Types.ObjectId, ref: 'Item' },
  category:{ type: String }
});

const Gallery = mongoose.model('Gallery', GallerySchema);

exports.Gallery = Gallery;
