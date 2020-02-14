const { check } = require('express-validator');
const express = require('express');
const {addInfo,
       getInfo,
       editInfo,
       deleteInfo} = require('../controllers/mainInfo');
const {catchErrors} = require('../errors/errorHandler');
const {upload} = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/info')
  .get( catchErrors(getInfo) )
  .post( upload,
         catchErrors(addInfo) )
  // .post( uploads, cloud,
  //       catchErrors(editInfo) )
  .delete(checkIfAuthenticated, [check('id').isMongoId()],
          catchErrors(deleteInfo));
router.route('/info/update')
.post( upload,
      catchErrors(editInfo) )

module.exports = router;
