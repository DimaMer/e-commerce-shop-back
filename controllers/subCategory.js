let { addSubCategory,
      getSubCategoryList,
      getSingleSubCategory,
      editSubCategory,
      deleteSubCategory
    } = require('../actions/subCategory');
exports.addSubCategory = async (req, res) =>{
  const error = await addSubCategory(req, res);
  if(error){ throw error; }
};
exports.getSubCategoryList = async (req, res) =>{
  const error = await getSubCategoryList(req, res);
  if(error){ throw error; }
};
exports.getSingleSubCategory = async (req, res) =>{
  const error = await getSingleSubCategory(req, res);
  if(error){ throw error; }
};
exports.editSubCategory = async (req, res) =>{
  const error = await editSubCategory(req, res);
  if(error){ throw error; }
};
exports.deleteSubCategory = async (req, res) =>{
  const error = await deleteSubCategory(req, res);
  if(error){ throw error; }
};
