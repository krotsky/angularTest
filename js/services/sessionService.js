app.factory('sessionService', function() {
  'use strict';
  var userIsAuthenticated = false;

  return {
    getUserAuthenticated: function(){
      return userIsAuthenticated;
    },
    setUserAuthenticated: function(value){
      userIsAuthenticated = value;
    }
  }
});