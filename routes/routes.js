var express = require('express');
var bodyParser = require('body-parser');

//Set router
var router = express.Router();
router.use(bodyParser.json());

//Routes controllers
var itemController = require('../controllers/item-controller');
var categoryController = require('../controllers/category-controller');
var checkController = require('../controllers/check-controller');

//item
router
    .route('/item')
    .get(itemController.getAllItens)
    .post(itemController.createItem);

router
    .route('/item/:itemId')
    .put(itemController.updateItem)
    .delete(itemController.deleteItem);

//category
router
    .route('/category')
    .get(categoryController.getAllCategories);

//check
router
    .route('/check')
    .post(checkController.createCheck);

router
    .route('/check/:checkId')
    .get(checkController.getCheck)
    .put(checkController.updateCheck);

router
    .route('/check/:checkId/item')
    .put(checkController.updateItemCheck);

module.exports = router;