const { check } = require('express-validator');
const express = require('express');
const {addReviewItem,
       getReviewItemList,
       getSingleReviewItem,
       editReviewItem,
       deleteReviewItem} = require('../controllers/reviewItem');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone} = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/reviewitem')
  .get(catchErrors(getReviewItemList));
router.route('/reviewitem/single')
  .get( [check('id').isMongoId()],
        catchErrors(getSingleReviewItem) )
  .post( uploadNone,
         [check('idItem').isMongoId()
       ],
         catchErrors(addReviewItem) )
  .put(checkIfAuthenticated,  uploadNone,
        [check('id').isMongoId()],
        catchErrors(editReviewItem) )
  .delete(checkIfAuthenticated, [check('id').isMongoId()],
          catchErrors(deleteReviewItem));

module.exports = router;