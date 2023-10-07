(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.buyItem = function (itemName) {
            ShoppingListCheckOffService.buyItem(itemName);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            {
                name: "cookies",
                quantity: 10
            },
            {
                name: "onions",
                quantity: 5
            },
            {
                name: "chicken",
                quantity: 7
            },
            {
                name: "avocados",
                quantity: 3
            },
            {
                name: "salmon",
                quantity: 2
            }
        ];

        var alreadyBoughtItems = [];

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function () {
            return alreadyBoughtItems;
        };

        service.buyItem = function (itemName) {
            var itemIndex = toBuyItems.findIndex(i => i.name == itemName)

            alreadyBoughtItems.push(toBuyItems[itemIndex])

            toBuyItems.splice(itemIndex, 1)
        }
    }

})();