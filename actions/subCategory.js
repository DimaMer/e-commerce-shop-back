const {validateData} = require('../helpers/dataValidator');
const {Category} = require('../models/Category');
const {SubCategory: SubCategory} = require('../models/SubCategory');

exports.getSubCategoryList = async (req, res) =>{
  await validateData(req);
  const category = await Category.findById(req.query._id);
  if(!category){
    const err = new Error('під категорії з таким ID не знайдено');
    err.status = 500;
    throw err;
  }
  res.status(200).json(category.subCategorys);
}

exports.getSingleSubCategory = async (req, res) =>{
  await validateData(req);
  console.log(req.query.catId, req.query.id);
  const foundedCategory = await Category.findById(req.query.catId);
  console.log(111,foundedCategory);
  const subCategory = await foundedCategory.subCategorys.id(req.query.id);

  res.status(200).json(subCategory);
}

exports.addSubCategory = async (req, res)=>{
  await validateData(req);
  const id = req.query._id;
  // console.log(111,id);
  const SubCategoryData = new SubCategory(req.body);
  if(!SubCategoryData){
    const err = new Error('Нову під категорії  не створено!');
    err.status = 404;
    throw err;
  }
  console.log(id);
  const updCategory = await Category.findByIdAndUpdate(id, {$push: {subCategorys: SubCategoryData}}, {new: true});
  res.status(200).json(updCategory);
}

exports.editSubCategory = async (req, res) => {
  await validateData(req);
  const {catId, idSubCat} = req.query;
  const newSubData = req.body;
  newSubData._id = catId;
  const categoryLang = await Category.findOneAndUpdate({"_id": catId, "subCategorys._id": idSubCat}, {$set: {'subCategorys.$': newSubData}}, {new: true});

  res.status(200).send(categoryLang);
}

exports.deleteSubCategory = async (req, res) => {
  await validateData(req);
  const {catId, subCatId} = req.query;
  const category = await Category.findById(catId);
  await category.subCategorys.id(subCatId).remove();
  await category.save();
  res.status(200).json(category);
}
