const express  = require('express');
const passport = require('passport');
const { check } = require('express-validator');

require('../modules/passport');

const {addUser,
       getUserList,
       getSingleUser,
       editUser,
       deleteUser,
       resetUserData,
       resetConfirm,
       login,
       logout
       } = require('../controllers/user');
const {catchErrors} = require('../errors/errorHandler');
const {uploadNone} = require('../helpers/multer');
const {checkIfAuthenticated, isAdmin} = require('../helpers/authCheck');
const router = express.Router();

router.route('/user')
  .get(  isAdmin, catchErrors( getUserList ));
router.route('/user/single')
  .get(
        catchErrors(getSingleUser) )
  .post( uploadNone,
         [check('firstName').not().isEmpty(),
          check('lastName').not().isEmpty(),
          check('email').isEmail(),
          check('password').isLength({ min: 4 })],
         catchErrors(addUser) )
  .put( uploadNone,
        [check('id').isMongoId(),
         check('email').if(check('email').exists()).isEmail(),
         check('password').if(check('password').exists()).isLength({ min: 4 })],
         catchErrors(editUser) )
  .delete( [check('id').isMongoId()],
           catchErrors(deleteUser));
router.route('/user/login')
  .post( uploadNone, passport.authenticate('local'), catchErrors(login));
router.route('/user/logout')
  .get( catchErrors(logout) );
router.route('/user/reset')
  .get( [check('email').isEmail()],
        catchErrors(resetUserData) );
router.route('/user/resetpassword')
  .get( catchErrors(resetConfirm), passport.authenticate('local'),
        function(req, res) { res.status(200).send('Successfuly authenticated!') });

module.exports = router;
