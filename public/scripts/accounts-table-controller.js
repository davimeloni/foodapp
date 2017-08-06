angular.module('foodapp');
app.controller('accountsTableController', ['$modal', '$scope', '$location', '$state', 'accountService', function ($modal, $scope, $location, $state, accountService) {

    $scope.orderByField = 'firstName';
    $scope.reverseSort = false;

    $scope.accounts = [];

    accountService.getAllAccounts().then(function(response) {
        $scope.accounts = response.data;
    })

}]);