angular.module('foodapp');
app.controller('manageItemController', ['$modal', '$scope', '$location', '$state', 'categoryService', 'itemService', function ($modal, $scope, $location, $state, categoryService, itemService) {

    itemService.getItens().then(function (response) {
        $scope.itens = response.data;

    });


    //$scope.createItem = function (hash) {
    //    $location.path(hash);
    //};


    $scope.createItem = function () {

        var modalInstance2 = $modal.open({
            controller: "createItemController",
            templateUrl: "/views/admin/createitem.html",
            resolve: {}
        });
    }

    $scope.editItem = function (item) {
        var modalInstance = $modal.open({
            controller: "editItemController",
            templateUrl: "/views/admin/edititem.html",

        });

        modalInstance.item = item;
        
    }

    $scope.removeItem = function(itemId) {
        console.log(itemId);
        itemService.removeItem(itemId);

        $state.reload();
    }

    $scope.test = function () {

        var modalInstance3 = $modal.open({
            controller: "testController",
            templateUrl: "test.html",
            resolve: {}
        });
    }

}]);

app.controller('createItemController', ['$scope', '$modalInstance','$state', 'categoryService', 'itemService', function ($scope, $modalInstance, $state, categoryService, itemService) {

    $scope.item = {};

    categoryService.getCategories().then(function (response) {
        $scope.categories = response.data;
    });

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $state.reload();
    };

    $scope.showSuccessAlert = false;

    var itemData = {
        name: "",
        description: "",
        price: 0,
        category: "",
        categorytype: "",
        image: ""
    };

    $scope.registerItem = function (item) {
        console.log("posting data...");
        console.log(item.selectedCategory.category);

        itemData.name = item.name;
        itemData.description = item.description;
        itemData.price = item.price;
        itemData.category = item.selectedCategory.category;
        itemData.categorytype = item.selectedCategoryType;

        //itemData.image.files[0] = $scope.item.image;
        itemService.createItem(itemData);

        $scope.showSuccessAlert = true;

        console.log(itemData);

        $scope.item = {};
    }

}]);


app.controller('editItemController', ['$scope', '$modalInstance', '$state', 'categoryService', 'itemService', function ($scope, $modalInstance, $state, categoryService, itemService) {

    $scope.item = {};

    itemData = {};

    categoryService.getCategories().then(function (response) {
        $scope.categories = response.data;
    });

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.showSuccessAlert = false;

    console.log($modalInstance.item);

    $scope.item.name = $modalInstance.item.name;
    $scope.item.description = $modalInstance.item.description;
    $scope.item.price = $modalInstance.item.price;
    $scope.item.selectedCategory = $modalInstance.item.category;
    $scope.item.selectedCategoryType = $modalInstance.item.categorytype;

    $scope.updateItem = function () {
        console.log("putting data...");
        itemData._id = $modalInstance.item._id;
        itemData.name = $scope.item.name;
        itemData.description = $scope.item.description;
        itemData.price = $scope.item.price;
        itemData.category = $scope.item.selectedCategory.category;
        itemData.categorytype = $scope.item.selectedCategoryType;

        //itemData.image.files[0] = $scope.item.image;
        itemService.updateItem(itemData);

        $scope.showSuccessAlert = true;

        console.log(itemData);

        $modalInstance.close();
        $state.reload();
    }
    
}]);

app.controller('testController', ['$scope', '$modalInstance','$state', 'categoryService', 'itemService', function ($scope, $modalInstance, $state, categoryService, itemService) {

}]);
