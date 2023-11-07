(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'UserService'];
    function SignUpController(MenuService, UserService) {
        var $ctrl = this;
        $ctrl.validMenuItem = true;

        // On form submission, retrive the menu item and attempt to save the user information if everything is valid.
        $ctrl.submit = function () {
            getMenuItemAndMaybeSaveUser(true);
        }

        // Used for validation of the user's choice for the favorite item BEFORE the user hits the Submit button
        $ctrl.validateFavoriteMenuNumber = function () {
            // In this case, we do not need to save the user information
            getMenuItemAndMaybeSaveUser(false);
        };

        // Determines if the required items are filled out on the form and the specified favorite menu item is valid.
        $ctrl.valid = function () {
            if ($ctrl.form.$invalid || !$ctrl.validMenuItem) {
                return false;
            }
            return true;
        };

        function getMenuItemAndMaybeSaveUser(saveUser) {
            var favoriteMenuNumber = $ctrl.favoriteMenuNumber;
            if (favoriteMenuNumber) {
                var [category, menuNumber] = getCategoryAndMenuNumber(favoriteMenuNumber);
                MenuService.getMenuItem(category, menuNumber)
                    .then(response => {
                        if (response != null) {
                            // A good response indicates that the menu item is valid.
                            $ctrl.validMenuItem = true;
                            // If everything is valid and we want to save the user information, save the user's preference so that it can be
                            // retrieved in another view/component/controller/etc.
                            if (saveUser) {
                                var userInfo = {
                                    firstName: $ctrl.firstName,
                                    lastName: $ctrl.lastName,
                                    email: $ctrl.email,
                                    phoneNumber: $ctrl.phoneNumber,
                                    favoriteMenuNumber: $ctrl.favoriteMenuNumber.toUpperCase()
                                };
                                // Save the user information
                                UserService.setUser(userInfo);
                                $ctrl.savedUser = true;
                            }

                        } else {
                            // The menu item is invalid
                            $ctrl.validMenuItem = false;
                        }
                    })
                    .catch(e => {
                        // Log error and the menu item is invalid
                        console.log('error: ', e.message);
                        $ctrl.validMenuItem = false;
                    })
            }
        }

        // Properly format categoory and menu number
        function getCategoryAndMenuNumber(favoriteMenuNumber) {
            var [category, menuNumber] = favoriteMenuNumber.split(/(\d+)/);
            menuNumber -= 1;
            category = category.toUpperCase();
            return [category, menuNumber];
        }
    }

})();
