let { addGallery, 
      getGalleryList,
      getSingleGallery,
      editGallery,
      deleteGallery 
    } = require('../actions/gallery');
exports.addGallery = async (req, res) =>{
  const error = await addGallery(req, res);
  if(error){ throw error; } 
};
exports.getGalleryList = async (req, res) =>{
  const error = await getGalleryList(req, res);
  if(error){ throw error; } 
};
exports.getSingleGallery = async (req, res) =>{
  const error = await getSingleGallery(req, res);
  if(error){ throw error; } 
};
exports.editGallery = async (req, res) =>{
  const error = await editGallery(req, res);
  if(error){ throw error; } 
};
exports.deleteGallery = async (req, res) =>{
  const error = await deleteGallery(req, res);
  if(error){ throw error; } 
};