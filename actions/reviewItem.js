const {validateData} = require('../helpers/dataValidator');
const { ReviewItem } = require('../models/ReviewItem');
const { Item } = require('../models/Item');
const {updateEntity} = require('../helpers/entityUpdater');

exports.getReviewItemList = async (req, res) =>{
    const filter = req.query? req.query: ''
    const itemList =  await ReviewItem.find(filter);
    itemList.length!==0? res.status(200).json(itemList): res.status(404).json({query:filter});

  if(!itemList){
      const err = new Error('Виникла помилка при виконанні запиту!');
      err.status = 500;
      throw err;
    }
    // res.status(200).json(itemList);
  }

exports.getSingleReviewItem = async (req, res) =>{
  await validateData(req);
  const foundedReviewItem = await ReviewItem.findById(req.query.id);
  if(!foundedReviewItem){
    const err = new Error('Товар з таким id не знайдено!');
    err.status = 404;
    throw err;
  }
  res.status(200).json(foundedReviewItem);
}

exports.addReviewItem = async (req, res)=>{
  await validateData(req);
  const newReviewItemData = req.body;

 if (await Item.findById(newReviewItemData.idItem)) {
     const photoFile = req.files.photo;
     const photo = photoFile[0].path||photoFile;


  const newReviewItem = await new ReviewItem(newReviewItemData);
     newReviewItem.photo = photo;
     if (!newReviewItem) {
         await unbindImageByAddress(photo);
         const err = new Error('Нову фотографію не додано!');
         err.status = 404;
         throw err;
     }
  const createdReviewItem = await newReviewItem.save();
  // await Item.findByIdAndUpdate(newReviewItemData.idItem, {$push: {reviews: createdReviewItem._id}}, {new: true});
  res.status(200).json(createdReviewItem);}
 else {
       res.status(404).json({error:"Товар з таким id не знайдено!"});
 }
}

exports.editReviewItem = async (req, res) => {
  await validateData(req);
  const id = req.query.id;
  const updatedReviewItem = await updateEntity(id, req, ReviewItem);
  if(!updatedReviewItem){
    const error = new Error('Помилка при виконанні оновлення!');
    error.status = 500;
    throw error;
  }
  res.status(200).json('Успіх!');
}

exports.deleteReviewItem = async (req, res) => {
  await validateData(req);
  const deletedReviewItem = await ReviewItem.findByIdAndDelete(req.query.id);
  res.status(200).json(deletedReviewItem);
}
