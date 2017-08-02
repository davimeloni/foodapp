angular.module('foodapp');
app.controller('menuController', ['$rootScope', '$scope', '$modal', '$state', '$filter',
    'itemService', 'categoryService', 'accountService', function ($rootScope, $scope, $modal, $state, $filter,
        itemService, categoryService, accountService) {

        $scope.itens = [];
        $scope.categories = [];
        $scope.selectCategory = {};
        $scope.selectCategoryType = '';
        $scope.account = {};
        filteredItens = [];
        $scope.iconsClass = "defaultC";
        $scope.selectedC = -1;
        $scope.selectedCT = -1;
        
        $scope.filter = '';
        $scope.filter.$stateful = true;

        $scope.account = accountService.getAccount();

        //get categories
        categoryService.getCategories().then(function (response) {
            $scope.categories = response.data;
            //$scope.selectedCategory = $scope.categories[0];
            //console.log($scope.categories);
            //$scope.selectedCategoryType = $scope.categories[0].categorytype[0];
            return $scope.categories;
        });

        //get the menu from DB
        itemService.getItens().then(function (response) {
            $scope.itens = response.data;
            return $scope.itens;
        });



        //--------------------- Select functions ---------------------------------------

        $scope.selectCategory = function (selectedCategory, index) {
            console.log(selectedCategory.categorytype[0]);
            $scope.selectedCategoryType = selectedCategory.categorytype[0];
            $scope.selectedCategory = selectedCategory;
            console.log($scope.selectedCategory);
            $scope.selectedC = index;
            $scope.filter = selectedCategory.categorytype[0];
            $scope.selectedCT = 0;
        }

        $scope.selectCategoryType = function (selectedCategoryType, index) {
            console.log(selectedCategoryType);
            $scope.selectedCategoryType = selectedCategoryType;
            $scope.selectedCT = index;
        }



        //------------------------open modals------------------------------

        $scope.openAddItem = function (itemToAdd) {
            var modalInstance = $modal.open({
                controller: "addItemController",
                templateUrl: "/views/customer/additem.html",
                resolve: {}
            });

            modalInstance.account = $scope.account;
            modalInstance.itemToAdd = itemToAdd;
        }

        $scope.openAccount = function () {
            var modalInstance2 = $modal.open({
                controller: "accountController",
                templateUrl: "/views/customer/account.html",
                resolve: {}
            });
            modalInstance2.account = $scope.account;
        }

    }]);

//Controller to the page to add item to the account
app.controller('addItemController', ['$modalInstance', '$scope', 'itemService', 'accountService',
    function ($modalInstance, $scope, itemService, accountService) {

        $scope.itemToAdd = $modalInstance.itemToAdd;
        $scope.account = $modalInstance.account;
        console.log($scope.account);
        $scope.comments = '';

        //------------- function to add item to cart -------------------------------
        $scope.addItem = function (itemToAdd, comments) {
            preOrderItem = {
                orderedItem: itemToAdd,
                status: 'preOrderItem',
                comments: comments
            }
            $scope.account.orderedItens = preOrderItem;
            accountService.addItemAccount($scope.account);
            $modalInstance.dismiss();
        }

    }]);


//Controller for the Account
app.controller('accountController', ['$modalInstance', '$state', '$scope', '$location', '$window', 'itemService', 'accountService',
    function ($modalInstance, $state, $scope, location, $window, itemService, accountService) {

        var removeData = {};
        var orderData = {};
        $scope.preOrderItens = [];
        $scope.processingItens = [];
        $scope.deliveredItens = [];
        $scope.totalOpened = 0;
        $scope.totalOrdered = 0;

        $scope.account = $modalInstance.account;
        console.log($scope.account);

        //get account item data
        $scope.getItemData = function () {
            accountService.getAccountById($scope.account._id).then(function (response) {
                $scope.account = response.data;
                console.log(response.data.orderedItens);
                //filter itens
                $scope.account.orderedItens.forEach(function (filterItem) {
                    if (filterItem.status == "preOrderItem") {
                        console.log(filterItem.orderedItem.name + " - " + filterItem.status);
                        $scope.preOrderItens.push(filterItem);
                        $scope.totalOpened = $scope.totalOpened + filterItem.orderedItem.price;
                    } else if (filterItem.status == "Delivered") {
                        $scope.deliveredItens.push(filterItem);
                        $scope.totalOrdered = $scope.totalOrdered + filterItem.orderedItem.price;
                    } else {
                        $scope.processingItens.push(filterItem);
                        $scope.totalOrdered = $scope.totalOrdered + filterItem.orderedItem.price;
                    }
                });
                console.log($scope.deliveredItens);
            });
        };

        $scope.getItemData();

        //---------------------------------functions --------------------------------

        //remove item
        $scope.removeItem = function (item) {
            console.log("removing item...");
            removeData = {
                accountId: $scope.account._id,
                itemId: item._id
            }
            accountService.removeItemAccount(removeData);

            $scope.preOrderItens = [];
            $scope.processingItens = [];

            $scope.getItemData();
            $scope.totalOpened = $scope.totalOpened - item.orderedItem.price;
        }

        //order the opened itens
        $scope.orderItens = function (itens) {
            itens.forEach(function (item) {
                item.status = "Ordered";
            }, this);
            orderData = {
                accountId: $scope.account._id,
                orderedItens: itens,
            };
            console.log(orderData);
            accountService.updateItensAccount(orderData);
            $totalOpened = 0;
            $scope.preOrderItens = [];
            $scope.processingItens = [];

            $scope.getItemData();
        }

        //end acount for now

    }]);



