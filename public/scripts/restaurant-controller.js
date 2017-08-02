angular.module('foodapp');
app.controller('deliveryItemController', ['$state', '$scope', 'itemService', 'accountService', function ($state, $scope, itemService, accountService) {

    //not working yet
    //var status = {status: "readyToDelivery"};
    $scope.itensToDelivery = [];
    $scope.accounts = [];


    accountService.getItensAccountsByStatus().then(function(response) {
        $scope.accounts = response.data;
    });


    $scope.deliveryItem = function(item, accountId) {
        item.status = "Delivered";
        updateItemData = {
            accountId: accountId,
            orderedItens: item
        }

        console.log(updateItemData);

        accountService.updateItensAccount(updateItemData);
        console.log("item delivered, final step for item!!!");
        $state.reload();
    }

}]);

app.controller('manageAccountsController', ['$state', '$scope', 'itemService', 'accountService', function ($state, $scope, itemService, accountService) {

    $scope.itens = [];
    $scope.accounts = [];
    $scope.accountsToShow = [];
    $scope.accountPrice = 0;

    accountService.getItensAccountsByStatus().then(function(response) {
        $scope.accounts = response.data;
        console.log($scope.accounts);
        $scope.accounts.forEach(function(account) {
            
            
        }, this);
    });


}]);