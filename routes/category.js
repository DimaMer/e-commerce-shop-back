const { check } = require('express-validator');
const express = require('express');
const {addCategory,
       getCategoryList,
       getSingleCategory,
       editCategory,
       deleteCategory} = require('../controllers/category');
const {catchErrors} = require('../errors/errorHandler');
const {upload} = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/category')
  .get(catchErrors(getCategoryList));
router.route('/category/single')
  .get( [check('id').isMongoId()],
        catchErrors(getSingleCategory) )
  .post(checkIfAuthenticated,
         [check('name').not().isEmpty()],
         catchErrors(addCategory) )
  .put(checkIfAuthenticated,
        [check('id').isMongoId()],
        catchErrors(editCategory) )
  .delete(checkIfAuthenticated, [check('id').isMongoId()],
          catchErrors(deleteCategory));

module.exports = router;
