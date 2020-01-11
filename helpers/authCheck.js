/*Функція passport-a яка перевіряє чи авторизований користувач в системі
(чи є його дані в кукіз сесії)
*/
// const jwt         = require('jsonwebtoken');
exports.checkIfAuthenticated = (req, res, next) =>{
  const {user}= req;

  if (user.role == 'admin') return next ();

  // const a = jwt.verify(req.query.id, process.env.SECRET, (err, data) => {
  //   if(err) {
  //     res.sendStatus(403);
  //   } else {
      if (req.isAuthenticated()&&(data.id==user._id)) { return next (); }
  //   }
  // });
  //
  // if (a==user._id) { return next (); }

  res.status(401).send('Not authorised');
}

exports.isAdmin = (req, res, next) => {
  const {user}= req;
  if (user.role == 'admin')
    return next ();
  res.status(401).send('Only Admin');
}

exports.isUser = (req, res, next) => {
  if (req.isAuthenticated())
    return next ();
  res.status(401).send('Only User');
}
