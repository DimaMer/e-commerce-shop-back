const { check } = require('express-validator');
const express = require('express');
const {addInfo,
       getInfo,
       editInfo,
       deleteInfo} = require('../controllers/mainInfo');
const {catchErrors} = require('../errors/errorHandler');
const {upload} = require('../helpers/multer');
const {isAdmin, checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/info')
  .get( catchErrors(getInfo) )
  .post( upload, isAdmin,
         catchErrors(addInfo) )
  // .post( uploads, cloud,
  //       catchErrors(editInfo) )
  .delete(isAdmin, [check('id').isMongoId()],
          catchErrors(deleteInfo));
router.route('/info/update')
.post( upload, isAdmin,
      catchErrors(editInfo) )

module.exports = router;
