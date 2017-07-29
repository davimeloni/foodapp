var app = angular.module('foodapp', ["ui.router", "ui.bootstrap"]);


app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("test", {
     url: "/#",
     templateUrl: "/views/customer/menuv8.html",
     controller: "menuController",
     css: "/styles/menuv8.css"
  })
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


}]);

