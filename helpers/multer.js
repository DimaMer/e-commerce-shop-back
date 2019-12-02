const multer = require('multer');

/* Реалізація мультера (для завантаження картинок у сховище)
  upload - для завантаження фоографій
  uploadCv - для завантаження резюме
  uploadNone - просто читання даних з form-data взагалі без файла
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname==='photoHead') return cb(null, './public/photo');
    return cb(null, `public/${file.fieldname}`);
  },
  filename: (req, file, cb) => {
     cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

exports.upload =  multer({ storage }).fields([
    { name: 'photo', maxCount: 1 }
  ]);

exports.uploadCv = multer({ storage }).fields([
  { name: 'resume', maxCount: 1 }
]);

exports.uploadNone = multer().none();


exports.uploads =  multer({ storage }).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'photoHead', maxCount: 1 }
]);
