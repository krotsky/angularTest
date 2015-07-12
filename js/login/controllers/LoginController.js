app.controller('LoginController', ['$rootScope', '$scope', '$location', 'usersStorage', 'sessionService', function($rootScope, $scope, $location, usersStorage, sessionService) {
  'use strict';

  $scope.login = function() {
    var users = usersStorage.get();
    var email = $scope.email,
        password = Sha256.hash($scope.password);

    function isMatch(email, pass) {
      for(var i = 0; i < users.length; i++) {
        if(users[i].email === email) {
          if(users[i].password === pass) {
            sessionService.setUserAuthenticated(true);
            return true;
          }
        }
      }
    }

    if(isMatch(email, password)) {
      $rootScope.auth = sessionService.getUserAuthenticated();
      $rootScope.user = email;
      $location.path( "/search" );
    } else {
      $scope.error = 'please check your information';
    }
  };
}]);