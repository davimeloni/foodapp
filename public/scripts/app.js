var app = angular.module('foodapp', ["ui.router", "ui.bootstrap"]);


app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("createitem", {
     url: "/createitem",
     templateUrl: "/views/admin/createitem.html",
     controller: "createItemController",
     css: "/styles/createitem.css"
  })
    .state("menu", {
     url: "/menu",
     templateUrl: "/views/customer/menuv7.html",
     controller: "menuController",
     css: "/styles/menuv6.css"
  })
    .state("manageitens", {
      url: "/manageitens",
      templateUrl: "/views/admin/manageitem.html",
      controller: "manageItemController"
  })
    .state("createitem2", {
     url: "/createitem2",
     templateUrl: "/views/admin/createitemv2.html",
     controller: "createItemController",
     css: "/styles/createitem.css"
  })


}]);

