angular.module('foodapp');
app.controller('LoginController', ['$http', '$scope', '$location', '$window', function ($http, $scope, $location, $window) {

    //not using
    $scope.login = function () {
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
    }


}]);

app.controller('selectTableController', ['$scope', '$stateParams', '$window', '$location', 'userService', 'accountService', function ($scope, $stateParams, $window, $location, userService, accountService) {

    $scope.account = {};
    $scope.user = {};
    $scope.tablelist = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10];

    console.log($stateParams.email);
    $window.localStorage.setItem('token', $stateParams.token);

    userService.getUserByEmail($stateParams.email).then(function (response) {
        console.log(response.data);
        $scope.user = response.data;
    });

    // ------------------------ set data ---------------------------
    $scope.setData = function (table) {
        $scope.account = {
            counter: 1,
            customer: $scope.user,
            status: 'Opened',
            table: table
        }

        var account = $scope.account;
        console.log(account);
        //create the account
        accountService.createAccount(account).then(function (response) {
            $scope.account = response.data;
            console.log("deu certo? faz sentido ter dado");
            console.log($scope.account);
        });

    }

    //-------------------- access the menu -------------------------
    $scope.accessMenu = function () {
        $location.path('/menu');
        console.log($scope.account);
        accountService.setAccount($scope.account);
    }


    //logout
    $scope.logout = function () {
        delete $window.sessionStorage.token;
        $location.path('/login');
    }

}]);


