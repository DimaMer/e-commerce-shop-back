const { check } = require('express-validator');
const express = require('express');
const {addGallery,
       getGalleryList,
       getSingleGallery,
       editGallery,
       deleteGallery} = require('../controllers/gallery');

const {catchErrors} = require('../errors/errorHandler');
const { upload, convertImage } = require('../helpers/multer');
const {isAdmin, checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/gallery')
    .get(catchErrors(getGalleryList));
router.route('/gallery/update')
.post(  upload, isAdmin, convertImage, catchErrors(editGallery) )
router.route('/gallery/single')
    .get( [check('id').isMongoId()],
        catchErrors(getSingleGallery) )
    .post(  upload, isAdmin, convertImage,   catchErrors(addGallery) )
    .delete( isAdmin, [check('id').isMongoId()],
        catchErrors(deleteGallery));
// router.route('/galleryClear')
//     .get(catchErrors(galleryClear));
module.exports = router;
