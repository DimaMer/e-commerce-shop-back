const {Category: Category} = require('../models/Category');
const {unbindImageByAddress} = require('../helpers/unbindImages');
const {updateEntity} = require('../helpers/entityUpdater');
const {validateData} = require('../helpers/dataValidator');

exports.getCategoryList = async (req, res) => {
    categoryList = await Category.find();
    if (!categoryList) {
        const err = new Error('Виникла помилка при виконанні запиту!');
        err.status = 500;
        throw err;
    }
    res.status(200).json(categoryList);
}

exports.getSingleCategory = async (req, res) => {
    foundedCategory = await Category.findById(req.query.id);
    res.status(200).json(foundedCategory);
}

exports.addCategory = async (req, res) => {
    const CategoryData = req.body;
    await validateData(req);
    const newCategory = new Category(CategoryData);
    const createdCategory = await newCategory.save();
    res.status(200).json(createdCategory);
}

exports.editCategory = async (req, res) => {
    await validateData(req);
    const id = req.query.id;
    if (!!req.body.name) {
        const editedCategory = await updateEntity(id, req, Category);
    }
    res.status(200).send('Success!');
}

exports.deleteCategory = async (req, res) => {
    await validateData(req);
    const deletedCategory = await Category.findByIdAndDelete(req.query.id);
    res.status(200).json(deletedCategory);
}
