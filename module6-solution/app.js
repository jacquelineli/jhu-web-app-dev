(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope']

    function LunchCheckController($scope,
        $filter,
        $injector) {
        $scope.items = "";

        $scope.check = function () {
            var splitItems = $scope.items.split(',').filter(n => n.trim() != '');
            if (splitItems.length == 0) {
                $scope.message = "Please enter data first";
                $scope.messageStyle = { 'color': 'red' };
                $scope.inputStyle = { 'border': '1px solid red' };
            } else {
                $scope.messageStyle = { 'color': 'green' };
                $scope.inputStyle = { 'border': '1px solid green' };
                if (splitItems.length <= 3) {
                    $scope.message = "Enjoy!"
                } else {
                    $scope.message = "Too much!"
                }
            }
        };
    }

})();