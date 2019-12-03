const {validateData} = require('../helpers/dataValidator');
const { CategoryItem } = require('../models/CategoryItem');
const {updateEntity} = require('../helpers/entityUpdater');
exports.getCategoryItemList = async (req, res) =>{
  const sortBy = req.query.sort ? req.query.sort : 'date';
  let categoryCategoryItemList = null;
  if(req.query.done == 'true'){
    categoryCategoryItemList =  await CategoryItem.find({done: true}).sort({[sortBy]: -1});
  }else if(req.query.status == 'false'){
    categoryCategoryItemList =  await CategoryItem.find({done: false}).sort({[sortBy]: -1});
  }else{
    categoryCategoryItemList =  await CategoryItem.find().sort({[sortBy]: -1});
  }
  if(!categoryCategoryItemList){
    const err = new Error('Виникла помилка при виконанні запиту!');
    err.status = 500;
    throw err;
  }
  res.status(200).json(categoryCategoryItemList);
}

exports.getSingleCategoryItem = async (req, res) =>{
  await validateData(req);
  const foundedCategoryItem = await CategoryItem.findById(req.query.id);
  if(!foundedCategoryItem){
    const err = new Error('Товар не знайдено. Можливо був введений невірний id або він вже був видалений');
    err.status = 404;
    throw err;
  }
  res.status(200).json(foundedCategoryItem);
}

exports.addCategoryItem = async (req, res)=>{
  await validateData(req);
  const newCategoryItemData = req.body;
  const newCategoryItem = new CategoryItem(newCategoryItemData);
  const createdCategoryItem = await newCategoryItem.save();

  res.status(200).json(createdCategoryItem);
}

exports.editCategoryItem = async (req, res) => {
  await validateData(req);
  const id = req.query.id;
  const updatedCategoryItem = await updateEntity(id, req, CategoryItem);
  if(!updatedCategoryItem){
    const error = new Error('Помилка при виконанні оновлення!');
    error.status = 500;
    throw error;
  }
  res.status(200).send('Успіх');
}

exports.deleteCategoryItem = async (req, res) => {
  await validateData(req);
  const deletedCategoryItem = await CategoryItem.findByIdAndDelete(req.query.id);
  res.status(200).json(deletedCategoryItem);
}
