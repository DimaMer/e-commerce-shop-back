const {validateData} = require('../helpers/dataValidator');
const {Info} = require('../models/MainInfo');
const {unbindImageByAddress} = require('../helpers/unbindImages');
const {updateEntity} = require('../helpers/entityUpdater');

exports.getInfo = async (req, res) =>{
  const foundedInfo = await Info.find();
  res.status(200).json(foundedInfo[0]);
}

exports.addInfo = async (req, res)=>{
  const exist = await Info.find();
  if(exist.length){
    await unbindImageByAddress(photoFile[0].path||photoFile);
    return res.status(200).json(exist[0]);
  }

  const photoFile = req.files.photo;

  await validateData(req);
  const newInfoData = req.body;

  if (photoFile) {
    const photo = photoFile[0].path||photoFile;
    newInfoData.photo = photo; }
  const newInfo = new Info(newInfoData);
  const createdInfo = await newInfo.save();
  res.status(200).json(createdInfo);
}

exports.editInfo = async (req, res) => {
  await validateData(req);

  const id = req.body.id;
  const editedInfo = await updateEntity(id, req, Info);

  if(req.files&&req.files.photo){
    await unbindImageByAddress(editedInfo.photo);
  }


  if(!editedInfo){
    const photoFile = req.files.photo;
    if(req.files&&req.files.photo){
      await unbindImageByAddress(photoFile[0].path||photoFile);
    }
    const error = new Error('Помилка при виконанні оновлення!');
    error.status = 500;
    throw error;
  }


  res.status(200).send('Success!');
}



exports.deleteInfo = async (req, res) => {
  await validateData(req);
  const deletedInfo = await Info.findByIdAndDelete(req.query.id);
  await unbindImageByAddress(deletedInfo.photo);
  res.status(200).json(deletedInfo);
}
