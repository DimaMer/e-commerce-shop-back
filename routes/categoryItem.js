const express = require('express');
const { check } = require('express-validator');
const {addCategoryItem,
       getCategoryItemList,
       getSingleCategoryItem,
       editCategoryItem,
       deleteCategoryItem} = require('../controllers/categoryItem');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone} = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/categoryItem')
  .get(  catchErrors(getCategoryItemList));
router.route('/categoryItem/single')
  .get(  [check('id').isMongoId()],
        catchErrors(getSingleCategoryItem) )
  .post(uploadNone,
         catchErrors(addCategoryItem) )
  .put(checkIfAuthenticated,  uploadNone,
        [check('id').isMongoId(),
         check('email').if(check('email').exists()).isEmail(),
         check('phone').if(check('phone').exists()).isInt().isLength({ min: 6 })],
        catchErrors(editCategoryItem) )
  .delete(checkIfAuthenticated, [check('id').isMongoId()],
          catchErrors(deleteCategoryItem));

module.exports = router;
