(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .filter('totalPrice', TotalPriceFilter);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.buyItem = function (itemName, itemQuantity) {
            ShoppingListCheckOffService.buyItem(itemName, itemQuantity);
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
                quantity: 10,
                pricePerItem: 1.50
            },
            {
                name: "onions",
                quantity: 5,
                pricePerItem: 2.89
            },
            {
                name: "chicken",
                quantity: 7,
                pricePerItem: 3.19
            },
            {
                name: "avocados",
                quantity: 3,
                pricePerItem: 4.50
            },
            {
                name: "salmon",
                quantity: 2,
                pricePerItem: 9.49
            }
        ];

        var alreadyBoughtItems = [];

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function () {
            return alreadyBoughtItems;
        };

        service.buyItem = function (itemName, itemQuantity) {
            var itemIndex = toBuyItems.findIndex(i => i.name == itemName);

            toBuyItems[itemIndex].quantity = itemQuantity;
            alreadyBoughtItems.push(toBuyItems[itemIndex]);

            toBuyItems.splice(itemIndex, 1)
        }
    }

    function TotalPriceFilter() {
        return function (input) {
            // Calculate total price and only display 2 decimal places
            var totalPrice = (input.quantity * input.pricePerItem).toFixed(2);
            return "$$$" + totalPrice;
        }
    }

})();