const mongoose = require('mongoose');
const {Schema} = mongoose;

const MainInfoSchema = new Schema({
  title: { type:{ ua: String, ru: String, en: String }, default: { ua: "", ru: "", en: "" } },
  titleLong: { type:{ ua: String, ru: String, en: String }, default: { ua: "", ru: "", en: "" } },
  address: { type:{ ua: String, ru: String, en: String }, default: { ua: "", ru: "", en: "" } },
  phones1: {type: String, min: 6, default: "______" },
  phones2: {type: String, min: 6, default: "______" },
  phones3: {type: String, min: 6, default: "______" },
  email: { type: String,  default: "email" },
  photo: { type: String, default: "" }
});

const MainInfo = mongoose.model('MainInfo', MainInfoSchema);

exports.MainInfoSchema = MainInfoSchema;
exports.Info = MainInfo;
