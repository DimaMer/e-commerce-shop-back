const express = require('express');
const { check } = require('express-validator');
const {addItem,
       getItemList,
       getSingleItem,
       editItem,
       deleteItem} = require('../controllers/item');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone} = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/item')
  .get(  catchErrors(getItemList));
router.route('/item/single')
  .get(  [check('id').isMongoId()],
        catchErrors(getSingleItem) )
  .post(uploadNone,
         [check('firstName').not().isEmpty(),
         check('email').if(check('email').exists()).isEmail(),
         check('phone').isInt().isLength({ min: 6 })],
         catchErrors(addItem) )
  .put(checkIfAuthenticated,  uploadNone,
        [check('id').isMongoId(),
         check('email').if(check('email').exists()).isEmail(),
         check('phone').if(check('phone').exists()).isInt().isLength({ min: 6 })],
        catchErrors(editItem) )
  .delete(checkIfAuthenticated, [check('id').isMongoId()],
          catchErrors(deleteItem));

module.exports = router;
