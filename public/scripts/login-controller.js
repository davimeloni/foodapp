angular.module('foodapp');
app.controller('LoginController', ['$http', '$scope', '$location', function ($http, $scope, $location) {

    //not using
    $scope.login = function () {
        $http.get('/auth/facebook').then(function (response) {
            console.log("deu certo?");
        });
    }

    //Auth.facebook(token);

}]);

app.controller('selectTableController', ['$scope','$stateParams', '$window', '$location', 'userService', 'accountService', function($scope, $stateParams, $window, $location, userService, accountService) {
    
    $scope.account = {};
    $scope.counter = 0;
    $scope.user = {};
    $scope.tablelist = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10];

    console.log($stateParams.email);
    $window.localStorage.setItem('token', $stateParams.token);

    userService.getUserByEmail($stateParams.email).then(function(response) {
        console.log(response.data);
        $scope.user = response.data;
    });

    accountService.getLastAccount().then(function(response) {
        console.log(response.data);
        $scope.counter = response.data + 1;
    });


    // ------------------------ set data ---------------------------
    $scope.setDataAndGoToMenu = function(table) {
        
        $scope.account = {
            counter: $scope.counter,
            customer: $scope.user,
            status: 'Opened',
            table: table
        }

        var account = $scope.account;
        console.log(account);
        accountService.setProperty($scope.account);
        accountService.createAccount(account);

        $location.path('/menu');
    }

    //logout
    $scope.logout = function() {
        delete $window.sessionStorage.token;
        $location.path('/login2');
    }

}]);


