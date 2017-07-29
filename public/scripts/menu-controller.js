angular.module('foodapp');
app.controller('menuController', ['$scope', '$modal', '$state', 'itemService', 'categoryService', 'accountService',
    function ($scope, $modal, $state, itemService, categoryService, accountService) {

        $scope.itens = [];
        $scope.categories = [];
        $scope.table = 06;
        
        //get categories
        categoryService.getCategories().then(function (response) {
            $scope.categories = response.data;
            
        });

        //get the menu from DB
        itemService.getItens().then(function (response) {
            $scope.itens = response.data;
        });

        $scope.selectCategory = function (selectedCategory) {
            console.log(selectedCategory.categorytype[0]);
            $scope.selectedCategory = selectedCategory;
            $scope.selectedCategoryType = selectedCategory.categorytype[0];
        }

        $scope.selectCategoryType = function (selectedCategoryType) {
            console.log(selectedCategoryType);
            $scope.selectedCategoryType = selectedCategoryType;
        }



        //------------------------open modals------------------------------

        $scope.openAddItem = function (itemToAdd) {
            var modalInstance = $modal.open({
                controller: "addItemController",
                templateUrl: "/views/customer/additem.html",
                resolve: {}
            });

            modalInstance.itemToAdd = itemToAdd;
        }

        $scope.openAccount = function () {
            var modalInstance2 = $modal.open({
                controller: "accountController",
                templateUrl: "/views/customer/account.html",
                resolve: {}
            });
        }

    }]);

//Controller to the page to add item to the account
app.controller('addItemController', ['$modalInstance', '$scope', 'itemService', 'accountService',
    function ($modalInstance, $scope, itemService, accountService) {

        $scope.itemToAdd = $modalInstance.itemToAdd;
        $scope.comments = '';

        var account = {};

        account._id = '5971ffc8ad411f1be0563a77';
        account.orderedItens = {};

        $scope.addItem = function (itemToAdd, comments) {
            preOrderItem = {
                orderedItem: itemToAdd,
                status: 'preOrderItem',
                comments: comments
            }

            account.orderedItens = preOrderItem;
            console.log(account);

            accountService.addItemAccount(account);

            $modalInstance.dismiss();
        }

    }]);


//Controller for the Account
app.controller('accountController', ['$modalInstance', '$state', '$scope', 'itemService', 'accountService',
    function ($modalInstance, $state, $scope, itemService, accountService) {

        var removeData = {};
        var orderData = {};
        $scope.preOrderItens = [];
        $scope.processingItens = [];
        $scope.deliveredItens = [];
        $scope.totalOpened = 0;
        $scope.totalOrdered = 0;

        accountId = '5971ffc8ad411f1be0563a77';

        //get account item data
        $scope.getItemData = function () {
            accountService.getAccount(accountId).then(function (response) {
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
                accountId: accountId,
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
                accountId: accountId,
                orderedItens: itens
            };
            console.log(orderData);
            accountService.updateItensAccount(orderData);

            $scope.preOrderItens = [];
            $scope.processingItens = [];

            $scope.getItemData();
        }

    }]);



