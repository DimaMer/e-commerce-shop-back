const { check } = require('express-validator');
const express = require('express');
const {addInfo,
       getInfo,
       editInfo,
       deleteInfo} = require('../controllers/mainInfo');
const {catchErrors} = require('../errors/errorHandler');
const {upload, uploads, cloud} = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/info')
  .get( catchErrors(getInfo) )
  .post( upload, cloud,
         catchErrors(addInfo) )
  .put( uploads, cloud,
        catchErrors(editInfo) )
  .delete(checkIfAuthenticated, [check('id').isMongoId()],
          catchErrors(deleteInfo));

module.exports = router;
