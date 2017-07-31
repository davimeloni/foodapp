var app = angular.module('foodapp', ["ui.router", "ui.bootstrap"]);


app.config(["$stateProvider", "$locationProvider", "$urlRouterProvider", function($stateProvider, $locationProvider, $urlRouterProvider) {

  $stateProvider
    .state("menu", {
     url: "/menu",
     templateUrl: "/views/customer/menuv9.html",
     controller: "menuController",
     css: "/styles/menuv9.css"
  })
    .state("manageitens", {
      url: "/manageitens",
      templateUrl: "/views/admin/manageitem.html",
      controller: "manageItemController"
  })
    .state("kitchen", {
      url: "/kitchen",
      templateUrl: "/views/restaurant/kitchen.html",
      controller: "kitchenController"
    })
    .state("itensToDelivery", {
      url: "/itenstodelivery",
      templateUrl: "/views/restaurant/itenstodelivery.html",
      controller: "deliveryItemController"
    })
    .state("login2", {
      url: "/login2",
      templateUrl: "/views/login2.html",
      controller: "LoginController"
    })
    .state("selecttable", {
      url: "/selecttable/:email/:token",
      templateUrl: "/views/customer/selecttable.html",
      controller: "selectTableController"
    });

     //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('');

}]);

