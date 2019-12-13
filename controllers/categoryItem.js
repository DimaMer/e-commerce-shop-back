let { addCategoryItem,
      getCategoryItemList,
      getSingleCategoryItem,
      editCategoryItem,
      deleteCategoryItem
    } = require('../actions/categoryItem');
exports.addCategoryItem = async (req, res) =>{
  const error = await addCategoryItem(req, res);
  if(error){ throw error; }
};
exports.getCategoryItemList = async (req, res) =>{
  const error = await getCategoryItemList(req, res);
  if(error){ throw error; }
};
exports.getSingleCategoryItem = async (req, res) =>{
  const error = await getSingleCategoryItem(req, res);
  if(error){ throw error; }
};
exports.editCategoryItem = async (req, res) =>{
  const error = await editCategoryItem(req, res);
  if(error){ throw error; }
};
exports.deleteCategoryItem = async (req, res) =>{
  const error = await deleteCategoryItem(req, res);
  if(error){ throw error; }
};
