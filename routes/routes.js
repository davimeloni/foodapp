var express = require('express');
var bodyParser = require('body-parser');

//Set router
var router = express.Router();
router.use(bodyParser.json());

//Routes controllers
var itemController = require('../controllers/item-controller');
var categoryController = require('../controllers/category-controller');
var accountController = require('../controllers/account-controller');

//------------------------------------------------------------------------------------

//item
//methods
router
    .route('/item')
    .get(itemController.getAllItens)
    .post(itemController.createItem);

router
    .route('/item/:itemId')
    .put(itemController.updateItem)
    .delete(itemController.deleteItem);

//category
//methods
router
    .route('/category')
    .get(categoryController.getAllCategories);


//account
//create account
router
    .route('/account')
    .post(accountController.createAccount);

//get account or update by its id
router
    .route('/account/:accountId')
    .get(accountController.getAccount)
    .put(accountController.updateAccount);

//add item to account
router
    .route('/account/:accountId/additem')
    .put(accountController.addItemAccount);

//all itens in account
router
    .route('/account/:accountId/updateitens')
    .put(accountController.updateItensAccount);

//specific item in account
router
    .route('/account/:accountId/item/:itemId')
    .delete(accountController.deleteItemAccount);

//get itens by status
router
    .route('/accountstatus')
    .get(accountController.getItensAccountsByStatus);

//get accounts with itens in the kitchen
router
    .route('/accountskitchen')
    .get(accountController.getAccountItensKitchen);

module.exports = router;