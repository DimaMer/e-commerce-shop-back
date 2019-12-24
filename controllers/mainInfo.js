let { addInfo, 
      getInfo,
      editInfo,
      deleteInfo 
    } = require('../actions/mainInfo');
exports.addInfo = async (req, res) =>{
  const error = await addInfo(req, res);
  if(error){ throw error; } 
};
exports.getInfo = async (req, res) =>{
  const error = await getInfo(req, res);
  if(error){ throw error; } 
};
exports.editInfo = async (req, res) =>{
  const error = await editInfo(req, res);
  if(error){ throw error; } 
};
exports.deleteInfo = async (req, res) =>{
  const error = await deleteInfo(req, res);
  if(error){ throw error; } 
};