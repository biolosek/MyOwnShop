angular.module('myShop')
.controller('ordersController', function($scope, $rootScope, $http) {
    $scope.checkOrderFunction = function (item) {
      $rootScope.orderInfo = item;
      $http({
          method: 'post',
          url: './php/getOrderProducts.php',
          data: {
          order_id: $rootScope.orderInfo.order_id,

          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function successCallback(response) {
        $rootScope.orderProducts = response.data;
        console.log($rootScope.orderProducts);
      })
    }
})
