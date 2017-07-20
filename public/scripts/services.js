
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

//Services for table

//Services for check
angular.module('foodapp').service('checkService', checkService);
function checkService($http) {
    this.createCheck = function(check) {
        return $http.post('/check').then(complete).catch(failed);
    };

    //this.getCheck = function() {
    //    return
    //}

    this.updateItemCheck = function(check) {
        return $http.put('/check/' + check._id + '/item/', check).then(complete).catch(failed);
    };

}

//user


//http functions
function complete(response) {
    return response;
}

function failed(error) {
    console.log(error.statusText);
}
