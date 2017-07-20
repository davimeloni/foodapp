angular.module('foodapp');
app.controller('menuController', ['$scope','$modal', 'itemService', 'categoryService', 'checkService',
                                    function ($scope, $modal, itemService, categoryService, checkService) {

    
    //get the menu from DB
    $scope.itens = itemService.getItens().then(function (response) {
        $scope.itens = response.data;
    });

    //get categories
    categoryService.getCategories().then(function (response) {
        $scope.categories = response.data;
    });

    $scope.selectCategory = function(selectedCategory) {
        console.log(selectedCategory.categorytype[0]);
        $scope.selectedCategory = selectedCategory;
        $scope.selectedCategoryType = selectedCategory.categorytype[0];
    }

    $scope.selectCategoryType = function(selectedCategoryType) {
        console.log(selectedCategoryType);
        $scope.selectedCategoryType = selectedCategoryType;
    }

    //------------------------open modals------------------------------

    $scope.openAddItem = function(itemToAdd) {
        var modalInstance = $modal.open({
            controller: "addItemController",
            templateUrl: "/views/customer/additem.html",
            resolve: {}
        });

        modalInstance.itemToAdd = itemToAdd;
    }

    $scope.openCheck = function() {
        var modalInstance2 = $modal.open({
            controller: "checkController",
            templateUrl: "/views/customer/check.html",
            resolve: {}
        });
    }

    //open the Cart/Pedido (generate a new in here)
    
    //add a dish to the cart
    /*$scope.openDishAdd = function (dish) {
        
        var modalInstance = $modal.open({
            controller: "addDishController",
            templateUrl: "dishAdd.html",
        });

        modalInstance.dish = dish;
        console.log(dish);
    }*/
    
}]);

app.controller('addItemController', ['$modalInstance', '$scope', 'itemService', 'checkService',
                                 function ($modalInstance, $scope, itemService, checkService) {

    $scope.itemToAdd = $modalInstance.itemToAdd;  
    
    var check = {};

    check._id = '596f80c7687d04c90ca1bdd3';
    check.orderedItens = {};
    //check.status = 'Opened';
    //check.orderedItens = [{
     //   orderedItem: {},
     //   status: ''
    //}];

    $scope.addItem = function(itemToAdd) {
        preOrderItem = {
            orderedItem: itemToAdd,
            status: 'preOrderItem'
        }
        
        check.orderedItens = preOrderItem;
        //check.orderedItens.orderedItem = itemToAdd;
        //check.orderedItens.status = 'preOrderItem';

        console.log("updating check with the item");

        checkService.updateItemCheck(check);
    }

}]);



/*
app.controller('addDishController', ['$scope', '$modalInstance', 'menuFactory', function($scope, $modalInstance, menuFactory) {

    console.log($modalInstance.dish);
    $scope.dish = $modalInstance.dish;

    $scope.additionals = menuFactory.getAdditionals();

    $scope.getTotal = function() {

    }

    $scope.addToCart = function() {
        //get selected additionals

        //get dish quantity

        //Compile into a dish in the cart (dish + additionals)
        //and persist as the dish as added to cart.
    }

}]);

app.controller('orderManagerController')

    Get order from DB to display all dishes ordered for this specific order
    getOrder();

    //order the dishes that are 'added to cart' and set them to 'ordered' (Kitchen will see the dishes with 'ordered' status)
    order();

    //remove a dish from the order
    removeDish();

    getTotalAddedToCart();
    getTotalOrdered();

    set Order status to askedToClose...
    Ask if want pay from the app or call the Waiter
    Notify the waiter anyway...
    if transaction was successful, set Order to 'closed'
    closeOrder();

*/

