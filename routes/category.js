const { check } = require('express-validator');
const express = require('express');
const {addCategory,
       getCategoryList,
       getSingleCategory,
       editCategory,
       deleteCategory} = require('../controllers/category');
const {catchErrors} = require('../errors/errorHandler');
const {upload} = require('../helpers/multer');
const {isAdmin, checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/category')
  .get(catchErrors(getCategoryList));
router.route('/category/single')
  .get( [check('id').isMongoId()],
        catchErrors(getSingleCategory) )
  .post(isAdmin,
         [check('name.ua').not().isEmpty(),
         check('name.en').not().isEmpty(),
         check('name.ru').not().isEmpty()
         ],
         catchErrors(addCategory) )
  .put(isAdmin,
        [check('id').isMongoId()],
        catchErrors(editCategory) )
  .delete(isAdmin, [check('id').isMongoId()],
          catchErrors(deleteCategory));

module.exports = router;
