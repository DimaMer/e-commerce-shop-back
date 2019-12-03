const {validateData} = require('../helpers/dataValidator');
const { Item } = require('../models/Item');
const {updateEntity} = require('../helpers/entityUpdater');
exports.getItemList = async (req, res) =>{
  const sortBy = req.query.sort ? req.query.sort : 'date';
  let itemList = null;
  if(req.query.done == 'true'){
    itemList =  await Item.find({done: true}).sort({[sortBy]: -1});
  }else if(req.query.status == 'false'){
    itemList =  await Item.find({done: false}).sort({[sortBy]: -1});
  }else{
    itemList =  await Item.find().sort({[sortBy]: -1});
  }
  if(!itemList){
    const err = new Error('Виникла помилка при виконанні запиту!');
    err.status = 500;
    throw err;
  }
  res.status(200).json(itemList);
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
  console.log(newItemData);

  const newItem = new Item(newItemData);
  const createdItem = await newItem.save();

  res.status(200).json(createdItem);
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
  const deletedItem = await Item.findByIdAndDelete(req.query.id);
  res.status(200).json(deletedItem);
}
