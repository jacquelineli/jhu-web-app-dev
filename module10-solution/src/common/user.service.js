(function () {
  "use strict";

  angular.module('common')
    .service('UserService', UserService);

  function UserService() {
    var service = this;
    var user;

    // Save the user info
    service.setUser = function (userInfo) {
      user = userInfo;
    };

    // Return the user info
    service.getUser = function () {
      return user;
    }

    // Determine if we have user info
    service.hasUser = function () {
      return user ? true : false;
    }
  }
  
})();