const {validateData} = require('../helpers/dataValidator');
const { Item, ItemSchema } = require('../models/Item');
const {updateEntity} = require('../helpers/entityUpdater');
const { ReviewItem } = require('../models/ReviewItem');
const { Gallery } = require('../models/Gallery');
const { Category } = require('../models/Category');
const { SubCategory } = require('../models/SubCategory');
const _ = require('lodash');

exports.getItemList = async (req, res) =>{
const {page=1, limit=100,sort='_id', sortOrder=1, ...filter} = req.query? req.query: ''
  console.log(JSON.parse(sort));
  // const itemList =  await Item.find(filter);
  let itemList;
  if (filter._id)  itemList = await Item.paginate(
      Item.find(filter).populate('photos').populate('reviews').sort({ 'price': parseInt(sortOrder) }),
      { page: parseInt(page)||1, limit: parseInt(limit)||100 }
      )
  else
     itemList = await Item.paginate(
        Item.find(filter).sort( JSON.parse(sort) ),
        { page: parseInt(page)||1, limit: parseInt(limit)||100 }
    )

  const temp = await Category.find().populate('subCategory')
  itemList.docs= _.map(itemList.docs, function(key) {
    key.categoryName =_.find(temp, { '_id': key.category });
    key.subCategoryName =_.find(key.categoryName.subCategorys, { '_id': key.subCategory });
    return  {categoryName:key.categoryName.name, subCategoryName:key.subCategoryName.name, ...key._doc }
  })


  itemList.length!==0?  res.status(200).json(itemList): res.status(404).json({query:filter});

  if(!itemList){
    const err = new Error('Виникла помилка при виконанні запиту!');
    err.status = 500;
    throw err;
  }

}

exports.getSingleItem = async (req, res) =>{
  await validateData(req);
  const foundedItem = await Item.findById(req.query.id);
  if(!foundedItem){
    const err = new Error('Товар не знайдено. Можливо був введений невірний id або він вже був видалений');
    err.status = 404;
    throw err;
  }
  res.status(200).json(foundedItem);
}

exports.addItem = async (req, res)=>{
  await validateData(req);
  const newItemData = req.body;
  const foundedCategory = await Category.findById(newItemData.category);
  const subCategory = await foundedCategory.subCategorys.id(newItemData.subCategory);
  if (foundedCategory && subCategory) {
    const newItem = new Item(req.body);
    const createdItem = await newItem.save();
    res.status(200).json(createdItem);
  } else res.status(500).json('errorrr');
}

exports.editItem = async (req, res) => {
  await validateData(req);
  const id = req.query.id;
  const updatedItem = await updateEntity(id, req, Item);
  if(!updatedItem){
    const error = new Error('Помилка при виконанні оновлення!');
    error.status = 500;
    throw error;
  }
  res.status(200).send('Успіх');
}

exports.deleteItem = async (req, res) => {
  await validateData(req);
  await ReviewItem.deleteMany({idItem: req.query.id});
  await Gallery.deleteMany({idItem: req.query.id});
  const deletedItem = await Item.findByIdAndDelete(req.query.id);
  res.status(200).json(deletedItem);
}
