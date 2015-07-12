app.controller('SingupController', ['$rootScope', '$scope', '$location', 'usersStorage', 'sessionService', function($rootScope, $scope, $location, usersStorage, sessionService) {
  'use strict';
  var EMAIL_REGEXP = new RegExp(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i);

  $rootScope.auth = sessionService.getUserAuthenticated();

  $scope.singup = function() {
    var users = usersStorage.get();
    var email = $scope.email,
        password = $scope.password,
        passwordConfirm = $scope.passwordConfirm;

    if(EMAIL_REGEXP.test(email) && password.length > 7 && password === passwordConfirm) {
      users.push({
        email: email,
        password: Sha256.hash(password)
      });
      usersStorage.put(users);
      $location.path( "/login" );
    } else {
      if(!EMAIL_REGEXP.test(email)) {
        $scope.error = 'email is incorrect';
      } else if(password.length < 7) {
        $scope.error = 'password should be more than 8 symbols';
      } else {
        $scope.error = 'please confirm your password'
      }
    }
  };
}]);