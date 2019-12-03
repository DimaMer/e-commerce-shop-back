const express = require('express');
const { check } = require('express-validator');
const {addItem,
       getItemList,
       getSingleItem,
       editItem,
       deleteItem} = require('../controllers/item');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone, upload} = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/item')
  .get(  catchErrors(getItemList));
router.route('/item/single')
  .get(  [check('id').isMongoId()],
        catchErrors(getSingleItem) )
  .post(upload,
         // [check('firstName').not().isEmpty(),
         // check('email').if(check('email').exists()).isEmail(),
         // check('phone').isInt().isLength({ min: 6 })],
         catchErrors(addItem) )
  .put(checkIfAuthenticated,  uploadNone,
        [check('id').isMongoId(),
         check('email').if(check('email').exists()).isEmail(),
         check('phone').if(check('phone').exists()).isInt().isLength({ min: 6 })],
        catchErrors(editItem) )
  .delete(checkIfAuthenticated, [check('id').isMongoId()],
          catchErrors(deleteItem));

module.exports = router;



/* post  application/json; charset=utf-8
   { "category": "aaas",
    "subCategory": "sss123",
    "nameTop": "qw",
    "name": "qwwq",
    "reviews": [{"name":"dima1","stars":"3","text":"sdfsa asdfasdf asdfsadf"}]
    }
{
    "category": "aaas",
    "subCategory": "sss123",
    "statusItems": false,
    "_id": "5de6ccc53de91206000eeee0",
    "nameTop": "qw",
    "name": "qwwq",
    "reviews": [
        {
            "status": false,
            "_id": "5de6ccc53de91206000eeee1",
            "name": "dima1",
            "date": "2019-12-03T20:59:49.781Z"
        }
    ],
    "dateAddItem": "2019-12-03T20:59:49.781Z",
    "__v": 0
}*/
