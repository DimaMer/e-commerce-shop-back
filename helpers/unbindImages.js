const fs = require('fs');
/* Функція для видалення непотрібних картинок (якщо зв'язана з ними сутність 
   видаляється) */
exports.unbindImageByAddress = async function (imageAddress) {
  const fileExist = fs.existsSync(`public${imageAddress}`);
  if(imageAddress && fileExist){
      fs.unlink(`public${imageAddress}`, (err) => {
        if (err){
          throw err;
        }
      });
  }
  return;
};

