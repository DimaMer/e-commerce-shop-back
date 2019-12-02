/* Універсальна функція, яка за допомогою express-validator перевіряє
чи всі дані відповідають умовам */

const { validationResult } = require('express-validator');
const { unbindImageByAddress } =require('./unbindImages');
exports.validateData = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if(req.files){
      for(file in req.files){
        await unbindImageByAddress(req.files[file][0].path.split('public')[1]);
      }
    }
    const err = new Error('Не всі дані введені або введені невірно!');
    err.status = 400;
    throw err;
  }
}
