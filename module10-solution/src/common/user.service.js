(function () {
  "use strict";

  angular.module('common')
    .service('UserService', UserService);

  function UserService() {
    var service = this;
    var user;

    service.setUser = function (userInfo) {
      user = userInfo;
    };

    service.getUser = function () {
      return user;
    }

    service.hasUser = function () {
      return user ? true : false;
    }
  }
  
})();