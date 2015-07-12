app.factory('usersStorage', function(){
  'use strict';

  var STORAGE_ID = 'ShopAppUsertsStorage';

  return {
    get: function () {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function (users) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(users));
    }
  };
});