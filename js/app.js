'use strict';

var app = angular.module('ShopApp', ['ngRoute']);

app.config(function($routeProvider){
  for(var path in window.routes) {
    $routeProvider.when(path, window.routes[path]);
  }
  $routeProvider.otherwise({redirectTo: '/singup'});
});

app.run(function($rootScope, sessionService, $location){
  $rootScope.cart = [];
  $rootScope.countItems = 0;
  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    for(var i in window.routes) {
        if(next.indexOf(i) != -1) {
            if(window.routes[i].requireLogin && !sessionService.getUserAuthenticated()) {
                alert("You need to be authenticated to see this page!");
                $location.path( "/login" );
                event.preventDefault();
            }
        }
    }
  });
});

window.routes = {
  "/singup": {
    controller: 'SingupController',
    templateUrl: '/js/singup/views/singup.html',
    requireLogin: false
  },
  "/login": {
    controller: 'LoginController',
    templateUrl: '/js/login/views/login.html',
    requireLogin: false
  },
  "/search": {
    controller: 'SearchController',
    templateUrl: '/js/search/views/search.html',
    requireLogin: false //TODO: true
  }
}
