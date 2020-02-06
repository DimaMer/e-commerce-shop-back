const mongoose = require('mongoose');
const {Schema} = mongoose;
const {Item} = require('./Item');
const ReviewItemSchema = new Schema({
    idItem:{ type: Schema.Types.ObjectId, ref: 'Item' },
    name: {type: String,required: true},
    stars: {type: String},
    text: {type: String},
    photo: {type: String},
    status: { type: Boolean, required: true, default:false },
    date: { type: Date, required: true, default: Date.now },
});

 ReviewItemSchema.post(
    'find', feedAll=>feedAll.map(id=>{
        if(id.date){
          id._doc.date = id.date.toISOString().slice(0,10)
        }
        return id})
);

ReviewItemSchema.post(
    'findOne', feed=>{
      feed._doc.date = feed.date.toISOString().slice(0,10);
      return feed;
    }
);

ReviewItemSchema.post(
    'save', async function(doc) {
        const a= await Item.findByIdAndUpdate(doc.idItem, {$push: {reviews: doc.id}}, {new: true});
    });

const ReviewItem = mongoose.model('ReviewItem', ReviewItemSchema);

exports.ReviewItem = ReviewItem;
