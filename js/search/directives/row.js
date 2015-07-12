app.directive('row', function($rootScope) {
  'use strict';
  return { 
    restrict: 'A', 
    scope: { 
      item: '=' 
    },
    templateUrl: '/js/search/directives/row.html',
    link: function(scope) {
      scope.addToCart = function(item) {
        var obj = {},
            matches = false;
        for(var key in item) {
          obj[key] = item[key];
        }
        $rootScope.cart.forEach(function(item) {
          if(item.id === obj.id) {
            matches = true;
            item.quantity++;
          }
        })
        if (!matches) {
          obj.quantity = 1;
          $rootScope.cart.push(obj);
        }
        $rootScope.countItems += 1;
      }
    }
  }; 
});