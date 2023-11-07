(function () {
  "use strict";

  angular.module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['MenuService', 'UserService'];
  function MyInfoController(MenuService, UserService) {
    var $ctrl = this;

    $ctrl.hasUser = UserService.hasUser();
 
    // Fetch the user information
    if ($ctrl.hasUser) {
      $ctrl.user = UserService.getUser();

      var favoriteMenuNumber = $ctrl.user.favoriteMenuNumber;
      if (favoriteMenuNumber) {
        var [category, menuNumber] = favoriteMenuNumber.split(/(\d+)/);
        menuNumber -= 1;
        MenuService.getMenuItem(category.toUpperCase(), menuNumber)
          .then(response => {
            if (response != null) {
              $ctrl.user.menuItem = response;
              $ctrl.categoryShortName = category.toUpperCase();
            } else {
              $ctrl.user.menuItem = null;
            }
          })
          .catch(e => {
            console.log('error: ', e.message);
            $ctrl.isValidMenuItem = false;
          })
      }
    }

  }

})();
