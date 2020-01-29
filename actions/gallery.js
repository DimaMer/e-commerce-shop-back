const {validateData} = require('../helpers/dataValidator');
const {Gallery} = require('../models/Gallery');
const {Item} = require('../models/Item');
const {unbindImageByAddress} = require('../helpers/unbindImages');
const {updateEntity} = require('../helpers/entityUpdater');

exports.getGalleryList = async (req, res) => {
    const filter = req.query ? req.query : ''
    const galList = await Gallery.find(filter)
    galList.length !== 0 ? res.status(200).json(galList) : res.status(404).json({query: filter});
    if (!galList) {
        const err = new Error('Виникла помилка при виконанні запиту!');
        err.status = 500;
        throw err;
    }
}

exports.getSingleGallery = async (req, res) => {
    await validateData(req);
    const foundedImage = await Gallery.findById(req.query.id);
    res.status(200).json(foundedImage);
}

exports.addGallery = async (req, res) => {
    if (!req.files.photo) {
        const err = new Error('Виберіть фотографію!');
        err.status = 404;
        throw err;
    }
    const newGalleryItemData = req.body;
    if (await Item.findById(newGalleryItemData.idItem)) {
        const photoFile = req.files.photo;
        const photo = photoFile[0].path || photoFile;
        newGalleryItemData.photo = photo;
        const newGallery = await new Gallery(newGalleryItemData);
        if (!newGallery) {
            await unbindImageByAddress(photo);
            const err = new Error('Нову фотографію не додано!');
            err.status = 404;
            throw err;
        }
        const createdGallery = await newGallery.save();
        res.status(200).json(createdGallery);
    } else res.status(200).json('kxm');
}

exports.editGallery = async (req, res) => {
    await validateData(req);
    const id = req.body.id;
    const editedGallery = await updateEntity(id, req, Gallery);
    if (req.files.photo) {
        await unbindImageByAddress(editedGallery.photo);
    }
    const photoFile = req.files.photo;
    if (!editedGallery) {
        if (req.files.photo) {
            await unbindImageByAddress(photoFile[0].path || photoFile);
        }
        const error = new Error('Помилка при виконанні оновлення!');
        error.status = 500;
        throw error;
    }
    res.status(200).send('Success!');
}

exports.deleteGallery = async (req, res) => {
    await validateData(req);
    const deletedGallery = await Gallery.findByIdAndDelete(req.query.id);
    await Item.update({}, {$pull: {photos: req.query.id}}, {multi: true})
    await unbindImageByAddress(deletedGallery.photo);
    res.status(200).json(deletedGallery);
}
