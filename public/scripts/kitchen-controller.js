angular.module('foodapp');
app.controller('kitchenController', ['$state', '$scope', 'itemService', 'accountService', function ($state, $scope, itemService, accountService) {

    $scope.itensToCook = [{}];
    $scope.itensCooking = [];

    //get account itens to_cook and cooking to display right on the screen
    accountService.getAccountsKitchen().then(function (response) {
        $scope.accounts = response.data;

        $scope.accounts.forEach(function (account) {

            account.orderedItens.forEach(function (item) {
                if (item.status == "Ordered") {
                    $scope.itensToCook.push({
                        accountId: account._id,
                        accountUser: "",
                        _id: item._id,
                        orderedItemUpdatedAt: item.updatedAt,
                        status: item.status,
                        orderedItem: item.orderedItem
                    });
                } else if (item.status == "Cooking") {
                    $scope.itensCooking.push({
                        accountId: account._id,
                        accountUser: "",
                        _id: item._id,
                        orderedItemUpdatedAt: item.updatedAt,
                        status: item.status,
                        orderedItem: item.orderedItem
                    });
                }
            }, this);

        }, this);
        console.log($scope.itensToCook);
    });

    //--------------------------- functions -------------------------------------

    //cook item
    $scope.cookItem = function (item) {
        item.status = "Cooking";
        updateItemData = {
            accountId: item.accountId,
            orderedItens: item
        }
        accountService.updateItensAccount(updateItemData);
        console.log("cooking item");
        $state.reload();
    }

    //item is ready!!!
    $scope.finishItem = function (item) {
        item.status = "readyToDelivery";
        updateItemData = {
            accountId: item.accountId,
            orderedItens: item
        }
        console.log("item ready!!!!");
        accountService.updateItensAccount(updateItemData);
        $state.reload();
    }


}]);