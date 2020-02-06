const multer = require('multer');
const sharp = require('sharp');
const cloudinary  = require('cloudinary')
cloudinary.config({
  cloud_name: 'dtmqswql7',
  api_key: '441733751616911',
  api_secret: 'NrPljZnLRI5HxIRTytVOwiBaQy0',
});
const fs = require('fs');

exports.cloud = (req, res, next) => {


    let [{path}] =  req.files.photo||[{}];
    if (!path) return next()
    console.log(222222,path);
    cloudinary.uploader.upload(path, function(image, err ) {
    if (err) return res.send(err);

    if (image.url) {req.files.photo=image.url}
    console.log('cloud', req.files.photo)
        return next();
  })}

exports.convertImage = (req, res, next) => {
    let quality = Number(req.body.quality)
    let [{path, filename}] =  req.files.photo||[{}];
    if (!path) return next();
    if (!quality) return next();
    console.log('filenameSharp',filename)
    console.log('filenameSharp',path)

    sharp(path)
        .jpeg({
            quality: quality,
            chromaSubsampling: '4:4:4'
        })
        .toFile("./public/photo-resize/" + filename+ ".jpg", (err, info) => {
            if (err)return res.send(err);
            req.files.photo[0].path = "./public/photo-resize/" + req.files.photo[0].filename + ".jpg";
            fs.unlinkSync("./" + path);
            console.log('filenameSharp111111111',req.files)
            return next();
        })

}

/* Реалізація мультера (для завантаження картинок у сховище)
  upload - для завантаження фоографій
  uploadNone - просто читання даних з form-data взагалі без файла
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

      console.log(1111111,file);
      console.log(1111111,req.files);

    return cb(null, `public/${file.fieldname}`);
  },
  filename: (req, file, cb) => {
      console.log(1111111,file);
      console.log(1111111,req.files);
      return cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

exports.upload =  multer({ storage }).fields([
    { name: 'photo', maxCount: 1 }
  ]);

exports.uploadCv = multer({ storage }).fields([
  { name: 'resume', maxCount: 1 }
]);

exports.uploadNone = multer().none();


exports.uploads =  multer({ storage }).single( 'photo');
