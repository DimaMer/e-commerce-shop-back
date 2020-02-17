const { check } = require('express-validator');
const express = require('express');
const {addReviewItem,
       getReviewItemList,
       getSingleReviewItem,
       editReviewItem,
       deleteReviewItem} = require('../controllers/reviewItem');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone, upload, convertImage} = require('../helpers/multer');
const {checkIfAuthenticated, isAdmin} = require('../helpers/authCheck');
const router = express.Router();

router.route('/reviewitem')
  .get(catchErrors(getReviewItemList));
router.route('/reviewitem/single')
  .get( [check('id').isMongoId()],
        catchErrors(getSingleReviewItem) )
  .post( upload,  convertImage,
         [check('idItem').isMongoId()
       ],
         catchErrors(addReviewItem) )
  .put(isAdmin,  uploadNone,
        [check('id').isMongoId()],
        catchErrors(editReviewItem) )
  .delete(isAdmin, [check('id').isMongoId()],
          catchErrors(deleteReviewItem));

module.exports = router;
