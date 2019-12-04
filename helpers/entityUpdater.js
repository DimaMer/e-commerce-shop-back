const bcrypt = require('bcryptjs');

/* Універсальна функція для внесення змін до будь-якої сутності відповідно
   до введених даних. Приймає id сутності, req - об'єкт
   з даними для введення і Entity - модель */
exports.updateEntity = async (id, req, Entity)=>{
const updateObj = req.body;
  if (req.files && req.files.photoHead) {
    updateObj.photoHead = req.files.photoHead[0].path.split('public')[1];
  }

  if(req.files && req.files.photo){
    updateObj.photo = req.files.photo[0].path.split('public')[1];
    if (req.files.photoHead) {
      updateObj.photoHead = req.files.photoHead[0].path.split('public')[1];
    }
  }

  if(req.files && req.files.resume){
    updateObj.resume = req.files.resume[0].path.split('public')[1];
  }

  if(req.body.password){
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    updateObj.password = hashPassword;
  }

  const foundedEmployee = await Entity.findByIdAndUpdate(id, {$set: updateObj});
  console.log('foundedEmployee', foundedEmployee);
  return foundedEmployee;
}
