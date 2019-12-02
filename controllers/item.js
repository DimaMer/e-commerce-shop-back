let { addItem,
      getItemList,
      getSingleItem,
      editItem,
      deleteItem
    } = require('../actions/item');
exports.addItem = async (req, res) =>{
  const error = await addItem(req, res);
  if(error){ throw error; }
};
exports.getItemList = async (req, res) =>{
  const error = await getItemList(req, res);
  if(error){ throw error; }
};
exports.getSingleItem = async (req, res) =>{
  const error = await getSingleItem(req, res);
  if(error){ throw error; }
};
exports.editItem = async (req, res) =>{
  const error = await editItem(req, res);
  if(error){ throw error; }
};
exports.deleteItem = async (req, res) =>{
  const error = await deleteItem(req, res);
  if(error){ throw error; }
};
