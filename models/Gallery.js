const mongoose = require('mongoose');
const {Schema} = mongoose;

const GallerySchema = new Schema({
  photo: { type: String, required: true },
  url:{ type:String }
});

const Gallery = mongoose.model('Gallery', GallerySchema);

exports.Gallery = Gallery;
