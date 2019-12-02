const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true },
      date: { type: Date, required: true, default: Date.now },
      role:{type: String, required: true}
  }
);

UserSchema.pre('save', async function(){
    console.log(22)
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
  const hashPassword = await bcrypt.hash(this.password, salt);
  // const hashRole = await bcrypt.hash('admin', salt);
  this.password = hashPassword;
});

const User = mongoose.model('User', UserSchema);

exports.User = User;
