const {validateData} = require('../helpers/dataValidator');
const { Gallery } = require('../models/Gallery');
const { unbindImageByAddress } = require('../helpers/unbindImages');

exports.getGalleryList = async (req, res) =>{
  const galleryList = await Gallery.find();
  res.status(200).json(galleryList);
}

exports.getSingleGallery = async (req, res) =>{
  await validateData(req);
  const foundedImage = await Gallery.findById(req.query.id);
  res.status(200).json(foundedImage);
}

exports.addGallery = async (req, res)=>{

  if(!req.files.photo){
    const err = new Error('Виберіть фотографію!');
    err.status = 404;
    throw err;
  }
  const photoFile = req.files.photo;

  const photo = photoFile[0].path.split('public')[1];
  // const url = photoFile.image.url+'';
  const url =photo;
  const newGallery = await new Gallery({photo, url});

  if(!newGallery){
    await unbindImageByAddress(photo);
    const err = new Error('Нову фотографію не додано!');
      err.status = 404;
      throw err;
  }
  const createdGallery = await newGallery.save();

  res.status(200).json(createdGallery);
}

exports.deleteGallery = async (req, res) => {
  await validateData(req);
  const deletedGallery = await Gallery.findByIdAndDelete(req.query.id);
  await unbindImageByAddress(deletedGallery.photo);
  res.status(200).json(deletedGallery);
}

