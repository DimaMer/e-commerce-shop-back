const mongoose = require('mongoose');
const {Schema} = mongoose;

const MainInfoSchema = new Schema({
  title: { type:{ ua: String, ru: String, en: String } },
  titleLong: { type:{ ua: String, ru: String, en: String } },
  address: { type:{ ua: String, ru: String, en: String } },
  phones1: {type: String, min: 6, },
  phones2: {type: String, min: 6, },
  phones3: {type: String, min: 6, },
  email: { type: String,  },
  photo: { type: String, }
});

const MainInfo = mongoose.model('MainInfo', MainInfoSchema);

exports.MainInfoSchema = MainInfoSchema;
exports.Info = MainInfo;
