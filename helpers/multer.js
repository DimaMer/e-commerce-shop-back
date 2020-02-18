const multer = require('multer');
// const sharp = require('sharp');
const cloudinary  = require('cloudinary')
cloudinary.config({
  cloud_name: 'PUTnAME',
  api_key: 'API_KEY',
  api_secret: 'API_SECRET',
});
const fs = require('fs');

exports.cloud = (req, res, next) => {
    if(!req.files) return next();
    let [{path}] =  req.files.photo||[{}];
    if (!path) return next()
    cloudinary.uploader.upload(path, function(image, err ) {
    if (err) return res.send(err);
    if (image.url) {req.files.photo=image.url}
        return next();
  })}

exports.convertImage = (req, res, next) => {
    let quality = Number(req.body.quality)
    let [{path, filename, size}] =  req.files.photo||[{}];
    if (!path) return next();
    if (!quality) return next();

    if(size>502975) quality = 90;
    if(size>2502975) quality = 75;
    if(size>5502975) quality = 65;
    if(size>7502975) quality = 50;

    sharp(path)
        .jpeg({
            quality: quality,
            chromaSubsampling: '4:4:4'
        })
        .toFile("./public/photo-resize/" + filename+ ".jpg", (err, info) => {
            if (err)return res.send(err);
            req.files.photo[0].path = "./public/photo-resize/" + req.files.photo[0].filename + ".jpg";
            fs.unlinkSync("./" + path);
            return next();
        })

}

/* Реалізація мультера (для завантаження картинок у сховище)
  upload - для завантаження фоографій
  uploadNone - просто читання даних з form-data взагалі без файла
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, `public/${file.fieldname}`);
  },
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}-${Date.now()}-${file.originalname.replace(" ", "_")}`);
  },
});

exports.upload =  multer({ storage }).fields([
    { name: 'photo', maxCount: 1 }
  ]);

exports.uploadNone = multer().none();


exports.uploads =  multer({ storage }).single( 'photo');
