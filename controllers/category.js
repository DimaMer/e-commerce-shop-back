let { addCategory,
      getCategoryList,
      getSingleCategory,
      editCategory,
      deleteCategory
    } = require('../actions/category');
exports.addCategory = async (req, res) =>{
  const error = await addCategory(req, res);
  if(error){ throw error; }
};
exports.getCategoryList = async (req, res) =>{
  const error = await getCategoryList(req, res);
  if(error){ throw error; }
};
exports.getSingleCategory = async (req, res) =>{
  const error = await getSingleCategory(req, res);
  if(error){ throw error; }
};
exports.editCategory = async (req, res) =>{
  const error = await editCategory(req, res);
  if(error){ throw error; }
};
exports.deleteCategory = async (req, res) =>{
  const error = await deleteCategory(req, res);
  if(error){ throw error; }
};
