const multer = require('multer');
const sharp = require('sharp');
const cloudinary  = require('cloudinary')
cloudinary.config({
  cloud_name: 'dtmqswql7',
  api_key: '441733751616911',
  api_secret: 'NrPljZnLRI5HxIRTytVOwiBaQy0',
});
const fs = require('fs');
const path = require('path')

exports.cloud = (req, res, next) => {
    let path1 =  (req.files&&req.files.photo)? req.files.photo[0].path: null;
    console.log('cloud', path)

    cloudinary.uploader.upload(path1, function(image, err ) {
    if (err)return res.send(err);



    if (image.url) {req.files.photo=image.url}
        return next();
  })}

exports.convertImage = (req, res, next) => {
    let quality = Number(req.body.quality)
    let path1 = req.files.photo ? req.files.photo[0].path : null;
    if (quality){
    sharp(path1)
        .jpeg({
            quality: quality,
            chromaSubsampling: '4:4:4'
        })
        .toFile("./public/photo-resize/" + req.files.photo[0].filename + ".jpg", (err, info) => {
            if (err)return res.send(err);
            req.files.photo[0].path = "./public/photo-resize/" + req.files.photo[0].filename + ".jpg";
            fs.unlinkSync("./" + path);


        })
    }
    return next();
}

/* Реалізація мультера (для завантаження картинок у сховище)
  upload - для завантаження фоографій
  uploadNone - просто читання даних з form-data взагалі без файла
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path1 =  req.files.photo[0].path? req.files.photo[0].path: null;
      console.log(777,path)

      console.log(777,__dirname)
      if(file.fieldname==='photoHead') return cb(null, './public/photo');
    return cb(null, "./");
  },
  filename: (req, file, cb) => {
     cb(null, `pp${file.fieldname}-${Date.now()}-${file.originalname}`);
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
