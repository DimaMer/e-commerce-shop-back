let { addUser,
      getUserList,
      getSingleUser,
      editUser,
      deleteUser,
      login,
      logout,
      resetUserData,
      resetConfirm
    } = require('../actions/user');
exports.addUser = async (req, res) =>{
  const error = await addUser(req, res);
  if(error){ throw error; }
};
exports.getUserList = async (req, res) =>{
  const error = await getUserList(req, res);
  if(error){ throw error; }
};
exports.getSingleUser = async (req, res) =>{
  const error = await getSingleUser(req, res);
  if(error){ throw error; }
};
exports.editUser = async (req, res) =>{
  const error = await editUser(req, res);
  if(error){ throw error; }
};
exports.deleteUser = async (req, res) =>{
  const error = await deleteUser(req, res);
  if(error){ throw error; }
};
exports.login = async (req, res) =>{
  const error = await login(req, res);
  if(error){ throw error; }
};
exports.logout = async (req, res) =>{
  const error = await logout(req, res);
  if(error){ throw error; }
};
exports.resetUserData = async (req, res) =>{
  const error = await resetUserData(req, res);
  if(error){ throw error; }
};
exports.resetConfirm = async (req, res) =>{
  const error = await resetConfirm(req, res);
  if(error){ throw error; }
};
