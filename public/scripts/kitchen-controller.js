angular.module('foodapp');
app.controller('kitchenController', ['$state', '$scope', 'itemService', 'accountService', function ($state, $scope, itemService, accountService) {

    $scope.itensToCook = [];
    $scope.itensCooking = [];

    //get account itens to_cook and cooking to display right on the screen
    accountService.getAccountsKitchen().then(function (response) {
        $scope.accounts = response.data;

        $scope.accounts.forEach(function (account) {

            account.orderedItens.forEach(function (item) {
                if (item.status == "Ordered") {
                    $scope.itensToCook.push({
                        accountId: account._id,
                        accountUser: account.customer.username,
                        _id: item._id,
                        orderedItemUpdatedAt: item.updatedAt,
                        status: item.status,
                        orderedItem: item.orderedItem,
                        selected: false
                    });
                } else if (item.status == "Cooking") {
                    $scope.itensCooking.push({
                        accountId: account._id,
                        accountUser: "",
                        _id: item._id,
                        orderedItemUpdatedAt: item.updatedAt,
                        status: item.status,
                        orderedItem: item.orderedItem,
                        selected: false
                    });
                }
            }, this);

        }, this);
        //console.log($scope.itensToCook);
    });

    //-------------------------- select all --------------------------------------------

    $scope.selectAllItensToCook = function() {
        $scope.itensToCook.forEach(function(item) {
            if(item.selected) {
                item.selected = false;
            } else {
                item.selected = true;
            }
        });
    }

    $scope.selectAllItensCooking = function() {
        $scope.itensCooking.forEach(function(item) {
            if(item.selected) {
                item.selected = false;
            } else {
                item.selected = true;
            }
        });
    }


    //--------------------------- Buttons functions -------------------------------------

    //cook itens
    $scope.cookItens = function () {
        $scope.itensToCook.forEach(function (item) {
            if (item.selected == true) {
                item.status = "Cooking";
                updateItemData = {
                    accountId: item.accountId,
                    orderedItens: item
                }
                accountService.updateItensAccount(updateItemData);
                console.log("cooking item: " + item.orderedItem.name);
            }
        })
        $state.reload();
    }

    //item is ready!!!
    $scope.finishItem = function () {
        $scope.itensCooking.forEach(function (item) {
            if (item.selected == true) {
                item.status = "readyToDelivery";
                updateItemData = {
                    accountId: item.accountId,
                    orderedItens: item
                }
                accountService.updateItensAccount(updateItemData);
                console.log("Go delivery item: " + item.orderedItem.name);
            }
        })
        $state.reload();
    }
}]);