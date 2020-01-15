const { check } = require('express-validator');
const express = require('express');
const {addSubCategory,
       getSubCategoryList,
       getSingleSubCategory,
       editSubCategory,
       deleteSubCategory} = require('../controllers/subCategory');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone} = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/subCategory')
  .get([check('_id').isMongoId()],
       catchErrors(getSubCategoryList));
router.route('/subCategory/single')
  .get( [check('id').isMongoId(),
         check('catId').isMongoId()],
        catchErrors(getSingleSubCategory) )
  .post(checkIfAuthenticated,  uploadNone,
         [check('_id').isMongoId(),
         check('name').not().isEmpty()],
         catchErrors(addSubCategory) )
  .put(checkIfAuthenticated,  uploadNone,
        [check('idSubCat').isMongoId(),
         check('catId').isMongoId(),
         check('name').not().isEmpty()
         ],
        catchErrors(editSubCategory) )
  .delete(checkIfAuthenticated, [check('catId').isMongoId(),
           check('subCatId').isMongoId()],
          catchErrors(deleteSubCategory));

module.exports = router;
