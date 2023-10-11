(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.searchTerm = "";
        controller.found = [];

        controller.searchItems = function () {
            if (controller.searchTerm) {
                var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);

                promise.then(function (response) {
                    controller.found = response;
                    controller.message = controller.found.length == 0 ? "Nothing found" : null;

                }).catch(function (error) {
                    console.log("Something went terribly wrong while trying to get matched menu items.");
                });
            } else {
                controller.found = [];
                controller.message = "Nothing found";
            }
        }

        controller.removeItem = function (itemIndex) {
            if (controller.items.length > 0) {
                controller.items.splice(itemIndex, 1);
            }
        }

    }


    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;
        // reach out to the server and retrieve the list of menu items for the entire menu
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
            }).then(function (result) {
                var menuItems = [];

                for (var shortName in result.data) {
                    menuItems.push(...result.data[shortName].menu_items);
                }

                // process result and only keep items that match
                var foundItems = menuItems.filter(menuItem => menuItem.description.toLowerCase().includes(searchTerm.toLowerCase()));

                // return processed items
                return foundItems;
            });
        }
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'narrowItDown',
            bindToController: true
        };

        return ddo;
    }

})();

