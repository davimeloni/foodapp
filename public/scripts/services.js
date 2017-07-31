
//Services for itens
angular.module('foodapp').service('itemService', itemService);
function itemService($http) {

    //get all itens
    this.getItens = function () {
        return $http.get('/item').then(complete).catch(failed);
    };

    //create item
    this.createItem = function (item) {
        return $http.post('/item', item).then(complete).catch(failed);
    };


    this.updateItem = function (item) {
        return $http.put('/item/' + item._id, item).then(complete).catch(failed);
    };

    this.removeItem = function (itemId) {
        return $http.delete('/item/' + itemId).then(complete).catch(failed);
    };

};

//Services for categories
angular.module('foodapp').service('categoryService', categoryService);
function categoryService($http) {

    var categories = { content: null };
    //get all categories
    this.getCategories = function () {
        return $http.get('category').then(complete).catch(failed);
    };
};

//Services for account
angular.module('foodapp').service('accountService', accountService);
function accountService($http) {

    this.createAccount = function (account) {
        return $http.post('/account', account).then(complete).catch(failed);
    };

    this.getLastAccount = function () {
        return $http.get('/lastaccount').then(complete).catch(failed);
    }

    this.getAccount = function (accountId) {
        return $http.get('/account/' + accountId).then(complete).catch(failed);
    }

    this.addItemAccount = function (account) {
        return $http.put('/account/' + account._id + '/additem', account).then(complete).catch(failed);
    };

    this.updateItensAccount = function (orderData) {
        return $http.put('/account/' + orderData.accountId + '/updateitens', orderData).then(complete).catch(failed);
    };

    this.removeItemAccount = function (removeData) {
        return $http.delete('/account/' + removeData.accountId + '/item/' + removeData.itemId).then(complete).catch(failed);
    }

    this.getAccountsKitchen = function () {
        return $http.get('/accountskitchen').then(complete).catch(failed);
    }

    this.getItensAccountsByStatus = function () {
        return $http.get('/accountstatus').then(complete).catch(failed);
    }

    this.property = {};

    this.setProperty = function (property) {
        this.property = property;
    }

    this.getProperty = function () {
        return this.property;
    }
}

angular.module('foodapp')
    .factory('loginToMenuService', function () {

        return account = {
            counter: 1,
            customer: $scope.user,
            status: 'Opened',
            table: table
        }

        /*
        function setAccount(account) {
            savedAccount = account;
        }

        function getAccount() {
            return savedAccount;
        }
        */

        return {
            setAccount: function () {
                return savedAccount;
            },
            getAccount: function (account) {
                savedAccount = savedAccount;
            }
        }

    });

//user
angular.module('foodapp').service('userService', userService);
function userService($http) {
    this.getUserByEmail = function (email) {
        return $http.get('/user/' + email).then(complete).catch(failed);
    }
}


/*
angular.module('authServices', [])
    .factory('Auth', function () {
        var authFactory = {};

        AuthFactory.facebook = function (token) {
            $window.localStorage.setItem('token', token);
        }

        //Auth.isLoggedIn
        AuthFactory.isLoggedIn = function () {
            if (AuthToken.getToken()) {
                return true;
            } else {
                return false;
            }
        }
        return authFactory;

    })

    .factory('AuthToken', function () {
        var authTokenFactory = {};

        //authToken.setToken
        authTokenFactory.setToken = function (token) {
            $window.localStorage.setItem('token', token);
        };

        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        }

        return authTokenFactory;
    })

angular.module('foodapp').factory('AuthInterceptor', AuthInterceptor);
function AuthInterceptor($location, $q, $window, AuthFactory) {
  return {
    request: request,
    response: response,
    responseError: responseError
  };

  function request(config) {
    config.headers = config.headers || {};
    if ($window.sessionStorage.token) {
      config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
    }
    return config;
  }

  function response(response) {
    if (response.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      AuthFactory.isLoggedIn = true;
    }
    if (response.status === 401) {
      AuthFactory.isLoggedIn = false;
    }
    return response || $q.when(response);
  }

  function responseError(rejection) {
    if (rejection.status === 401 || rejection.status === 403) {
      delete $window.sessionStorage.token;
      AuthFactory.isLoggedIn = false;
      $location.path('/');
    }
    return $q.reject(rejection);
  }
}

angular.module('foodapp').factory('AuthFactory', AuthFactory);
function AuthFactory() {
  return {
    auth: auth
  };

  var auth = {
    isLoggedIn: false
  };
}*/

//http functions
function complete(response) {
    return response;
}

function failed(error) {
    console.log(error.statusText);
}
