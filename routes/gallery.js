const { check } = require('express-validator');
const express = require('express');
const {addGallery,
       getGalleryList,
       getSingleGallery,
       editGallery,
       deleteGallery} = require('../controllers/gallery');

const {catchErrors} = require('../errors/errorHandler');
const { upload, cloud, convertImage } = require('../helpers/multer');
const {checkIfAuthenticated} = require('../helpers/authCheck');
const router = express.Router();

router.route('/gallery')
    .get(catchErrors(getGalleryList));
router.route('/gallery/update')
.post(  upload, cloud, catchErrors(editGallery) )
router.route('/gallery/single')
    .get( [check('id').isMongoId()],
        catchErrors(getSingleGallery) )
    .post(  upload, cloud, convertImage,  catchErrors(addGallery) )
    .delete( [check('id').isMongoId()],
        catchErrors(deleteGallery));

module.exports = router;
