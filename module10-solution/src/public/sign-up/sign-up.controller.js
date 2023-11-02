(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'UserService'];
    function SignUpController(MenuService, UserService) {
        var $ctrl = this;
        $ctrl.validMenuItem = true;

        $ctrl.submit = function () {
            getMenuItemAndMaybeSaveUser(true);
        }

        $ctrl.validateFavoriteMenuNumber = function () {
            getMenuItemAndMaybeSaveUser(false);
        };

        $ctrl.valid = function () {
            if ($ctrl.form.$invalid || !$ctrl.validMenuItem) {
                return false;
            }
            return true;
        };

        function getMenuItemAndMaybeSaveUser(saveUser) {
            var favoriteMenuNumber = $ctrl.favoriteMenuNumber;
            console.log(favoriteMenuNumber);
            if (favoriteMenuNumber) {
                var [category, menuNumber] = getCategoryAndMenuNumber(favoriteMenuNumber);
                MenuService.getMenuItem(category, menuNumber)
                    .then(response => {
                        if (response != null) {
                            $ctrl.validMenuItem = true;

                            if (saveUser) {
                                var userInfo = {
                                    firstName: $ctrl.firstName,
                                    lastName: $ctrl.lastName,
                                    email: $ctrl.email,
                                    phoneNumber: $ctrl.phoneNumber,
                                    favoriteMenuNumber: $ctrl.favoriteMenuNumber.toUpperCase()
                                };
                                UserService.setUser(userInfo);
                                $ctrl.savedUser = true;
                            }

                        } else {
                            $ctrl.validMenuItem = false;
                        }
                    })
                    .catch(e => {
                        console.log('error: ', e.message);
                        $ctrl.validMenuItem = false;
                    })
            }
        }

        function getCategoryAndMenuNumber(favoriteMenuNumber) {
            var [category, menuNumber] = favoriteMenuNumber.split(/(\d+)/);
            menuNumber -= 1;
            category = category.toUpperCase();
            return [category, menuNumber];
        }
    }

})();
