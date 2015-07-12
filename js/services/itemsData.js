app.factory('itemsData', ['$http', function($http) {
  'use strict';

  return $http.get('/items.json')
              .success(function(data) {
                return data;
              })
              .error(function(error) {
                return error;
              })
}]);