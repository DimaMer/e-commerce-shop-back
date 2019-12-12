let { addReviewItem,
      getReviewItemList,
      getSingleReviewItem,
      editReviewItem,
      deleteReviewItem
    } = require('../actions/reviewItem');
exports.addReviewItem = async (req, res) =>{
  const error = await addReviewItem(req, res);
  if(error){ throw error; }
};
exports.getReviewItemList = async (req, res) =>{
  const error = await getReviewItemList(req, res);
  if(error){ throw error; }
};
exports.getSingleReviewItem = async (req, res) =>{
  const error = await getSingleReviewItem(req, res);
  if(error){ throw error; }
};
exports.editReviewItem = async (req, res) =>{
  const error = await editReviewItem(req, res);
  if(error){ throw error; }
};
exports.deleteReviewItem = async (req, res) =>{
  const error = await deleteReviewItem(req, res);
  if(error){ throw error; }
};
