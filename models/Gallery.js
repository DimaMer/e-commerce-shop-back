const mongoose = require('mongoose');
const {Schema} = mongoose;
const {Item} = require('./Item');

const GallerySchema = new Schema({
  photo: { type: String, required: true },
  idItem:{ type: Schema.Types.ObjectId, ref: 'Item' },
  category:{ type: String }
});




GallerySchema.post(
    'save', async function(doc) {
        console.log(doc.idItem);
        const a= await Item.findByIdAndUpdate(doc.idItem, {$push: {photos: doc.id}}, {new: true});
  console.log('%s has been saved', a);
});


const Gallery = mongoose.model('Gallery', GallerySchema);

exports.Gallery = Gallery;
