angular.module("myShop")
.controller("cartSummaryController", function($scope, cart) {
	if (total !== undefined) {var total = 0;} {
        $scope.cartData = cart.getProducts();

        $scope.sum = function () {
            for (var i = 0; i < $scope.cartData.length; i++) {
                total += ($scope.cartData[i].price * $scope.cartData[i].count);
            }
            return total;
        }

        $scope.remove = function (product_id) {
            cart.removeProduct(product_id);
        }
    }
});
