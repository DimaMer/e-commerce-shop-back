const {validateData} = require('../helpers/dataValidator');
const { Gallery } = require('../models/Gallery');
const { Item } = require('../models/Item');
const { unbindImageByAddress } = require('../helpers/unbindImages');

exports.getGalleryList = async (req, res) =>{
  const galleryList = await Gallery.find();

  const filter = req.query? req.query: ''

  console.log(filter);
  const galList = await Gallery.find(filter)

  galList.length!==0? res.status(200).json(galList): res.status(404).json({query:filter});

  if(!galList){
    const err = new Error('Виникла помилка при виконанні запиту!');
    err.status = 500;
    throw err;
  }


}

exports.getSingleGallery = async (req, res) =>{
  await validateData(req);
  const foundedImage = await Gallery.findById(req.query.id);
  res.status(200).json(foundedImage);
}

exports.addGallery = async (req, res)=> {

  if (!req.files.photo) {
    const err = new Error('Виберіть фотографію!');
    err.status = 404;
    throw err;
  }

  const newGalleryItemData = req.body;
  if (await Item.findById(newGalleryItemData.idItem)) {
  const photoFile = req.files.photo;

  const photo = photoFile[0].path;
       newGalleryItemData.photo = photo;

  const newGallery = await new Gallery(newGalleryItemData);
    if (!newGallery) {
    await unbindImageByAddress(photo);
    const err = new Error('Нову фотографію не додано!');
    err.status = 404;
    throw err;
  }

    const createdGallery = await newGallery.save();
    await Item.findByIdAndUpdate(newGalleryItemData.idItem, {$push: {photo: createdGallery.id}}, {new: true});
    res.status(200).json(createdGallery);
}
  else res.status(200).json('kxm');

}

exports.deleteGallery = async (req, res) => {
  await validateData(req);
  const deletedGallery = await Gallery.findByIdAndDelete(req.query.id);
  await unbindImageByAddress(deletedGallery.photo);
  res.status(200).json(deletedGallery);
}

