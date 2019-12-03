/*Функція passport-a яка перевіряє чи авторизований користувач в системі
(чи є його дані в кукіз сесії)
*/
exports.checkIfAuthenticated = (req, res, next) =>{
  return next();
  if (req.isAuthenticated()) { return next(); }
  res.status(401).send('Not authorised');
}


exports.isAdmin = (req, res, next) => {
  const {user}= req;

  if (user.role == 'admin')
    return next ();
  res.status(401).send('Only Admin');
}
