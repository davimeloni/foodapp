angular.module('foodapp');
app.controller('manageAccountsController', ['$state', '$scope', '$location', 'itemService', 'accountService', function ($state, $scope,$location, itemService, accountService) {

    $scope.itens = [];
    $scope.accounts = [];
    $scope.accountsToShow = [];
    $scope.accountPrice = 0;

    
    var loadData = function() {
            accountService.getItensAccountsByStatus().then(function(response) {
            $scope.accounts = response.data;
            console.log($scope.accounts);
        });
    }

    loadData();

    //----------------- functions -----------------------------

    //remove item
    $scope.removeItem = function (account, item) {
        console.log("removing item...");
        removeData = {
            accountId: account._id,
            itemId: item._id,
            item: item
        }
        console.log(removeData);
        accountService.removeItemAccount(removeData);
        
        $location.path('/manageaccounts');
    }

    $scope.closeAccount = function(account) {
        console.log("closing account");
        account.status = "Closed";

        accountService.updateAccount(account);

        loadData();
    }


}]);