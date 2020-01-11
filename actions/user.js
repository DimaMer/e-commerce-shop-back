const nodemailer  = require('nodemailer');
const jwt         = require('jsonwebtoken');
const {User: User}     = require('../models/User');
const {updateEntity} = require('../helpers/entityUpdater');
const {validateData} = require('../helpers/dataValidator');
exports.getUserList = async (req, res) =>{
  let userList = await User.find();
  if(!userList){
    const err = new Error('Виникла помилка при виконанні запиту!');
    err.status = 500;
    throw err;
  }
  res.status(200).json(userList);
}

exports.getSingleUser = async (req, res) =>{
  await validateData(req);
  const {user}= req;


  // jwt.verify(req.query.id, process.env.SECRET,async (err, data) => {
  //   if(err) {
  //     res.sendStatus(403);
  //   } else {
  //     const foundedUser = await User.findById(data.id);
  //     if(!foundedUser){
  //       const error = new Error('Адміна з таким id не існує!');
  //       error.status = 404;
  //       throw error;
  //     }
  //     res.status(200).json(foundedUser);
  //   }
  // });

      const foundedUser = await User.findById(user.id);
      if(!foundedUser){
        const error = new Error('Адміна з таким id не існує!');
        error.status = 404;
        throw error;
      }
      res.status(200).json(foundedUser);


}

exports.addUser = async (req, res)=>{
  await validateData(req);
  const newUserData = req.body;
  const newUser = new User(newUserData);
  const createdUser = await newUser.save();
  res.status(200).json(createdUser);
}

exports.editUser = async (req, res) => {
  await validateData(req);
  const{id} = req.query;
  const foundedUser = await updateEntity(id, req, User);
  if(!foundedUser){
    const error = new Error('Помилка при виконанні оновлення!');
    error.status = 500;
    throw error;
  }
  res.status(200).send('Успіх!');
}

exports.deleteUser = async (req, res) => {
  await validateData(req);
  const deletedUsern = await User.findByIdAndDelete(req.query.id);
  res.status(200).json(deletedUser);
}

exports.login = async (req, res) => {
  // const id =  req.user._id
  // const token = await jwt.sign({id}, process.env.SECRET,{ expiresIn: '600s' });
  const { firstName, lastName, email }=req.user
  res.status(200).send({firstName, lastName, email});
}

exports.logout = (req, res) => {
  req.logout();
  res.clearCookie("connect");
  res.status(200).send('До побачення )');
};

exports.resetUsernData = async(req, res) => {
  //Отримуємо дані про адміна по ел. пошті
  await validateData(req);
  const email = req.query.email;
  const user = await User.findOne({email}, {password:1});
  if(!user){
    const error = new Error('Адміна з такою адресою не існує!');
    error.status = 404;
    throw error;
  }

  //Формуємо дані для передачі в поштову скриньку адміна
  const token = await jwt.sign({user}, process.env.SECRET,{ expiresIn: '600s' });

  let HelperOptions = {
    from: '"Dent-art-studio" <dentartstudio@gmail.com>',
    to: email,
    subject: 'Відновлення паролю',
    html: `<h1>Для відновлення паролю перейдіть за посиланням:</h1><br><h2>`+
    `<a href="https://${req.headers.host}/api/user/resetpassword/?token=${token}">Відновити пароль</a></h2>`,
    disableUrlAccess: true
  };

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    },
  });

  // verify connection configuration
  transporter.verify(function(err, success) {
    if (err) {
      const error = new Error('Проблеми з підключенням до поштової служби');
      error.status = 500;
      throw error;
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      throw error;
    }
    res.send({
      message:"Повідомлення успішно відправлене",
    });
    console.log(info);
  });
}

exports.resetConfirm = async (req, res) =>{
  const { token } = req.query;

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if(err) {
        res.sendStatus(403);
    } else {
      res.json({
        id: data.user._id,
        password: data.user.password
      })
    }
  });
}
