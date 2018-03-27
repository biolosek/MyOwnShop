angular.module('myShop', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('myShop')
.factory("cart", function ($cookieStore, $rootScope) {
	return {
		addProduct: function (product_id, name, price) {
			var addedToExistingItem = false;
			if (cartData === undefined) {cartData = [];} {
			for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].product_id === product_id) {
                    cartData[i].count++;
                    addedToExistingItem = true;
                    break;
                }
            }
			}
			if (!addedToExistingItem) {
				cartData.push({
					count: 1, product_id: product_id, price: price, name: name
				});
			}
            $cookieStore.put('cartData', cartData);

        },
		removeProduct: function (product_id) {
			for (var i = 0; i < cartData.length; i++) {
				if (cartData[i].product_id === product_id) {
					cartData.splice(i, 1);
                    $cookieStore.remove('cartData');
                    $cookieStore.put('cartData', cartData);
					break;
				}
			}
		},
		getProducts: function() {
			cartData = $cookieStore.get('cartData');
			return cartData;
		}
	}
})
.directive("cartSummary", function (cart) {
  return {
          restrict: "E",
          templateUrl: "./views/cartSummary.html",
          controller: function ($scope) {
      $scope.cartData = cart.getProducts();
              $scope.total = function () {
                var total = 0;
        if (cartData !== undefined)
                  for (var i = 0; i < cartData.length; i++) {
                      total += (cartData[i].price * cartData[i].count);
                  }
                  return total;
              }
              $scope.itemCount = function () {
                var total = 0;
                  if (cartData !== undefined)
                  for (var i = 0; i < cartData.length; i++) {
                      total += cartData[i].count;
                  }
                  return total;
              }
          }
      }
})
.run(function($rootScope, $cookieStore, $http){
  $rootScope.authenticated = $cookieStore.get('authenticated');
  $rootScope.user = $cookieStore.get('user');

  $rootScope.getUserInfo = function() {
  $http({
      method: 'post',
      url: './php/getUserInfo.php',
      data: {
      account_id: $rootScope.user[0].account_id,
      username: $rootScope.user[0].username,
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })

  .then(function successCallback(data) {
    $rootScope.userInfoResponse = data.data;
        if ($rootScope.userInfoResponse != undefined && $rootScope.userInfoResponse[0].account_id != undefined && $rootScope.userInfoResponse[0].account_id != 0) {
          $cookieStore.remove('user');
          $rootScope.user = $rootScope.userInfoResponse;
          $rootScope.userInfoResponse = undefined;
          $cookieStore.put('user', $rootScope.user);
          return;
        }
        else {
          swal ( "Oops",  "Something went wrong, try again!",  "error" )
          return;
        }
    })
}

$rootScope.getProductsFunction = function() {
$http({
    method: 'get',
    url: './php/getProducts.php',
})

.then(function successCallback(data) {
  $rootScope.products = data.data;
  })
}
$rootScope.getCategoriesFunction = function() {
$http({
    method: 'get',
    url: './php/getCategories.php',
})

.then(function successCallback(data) {
  $rootScope.categories = data.data;
  })
}

$rootScope.getBrandsFunction = function() {
$http({
    method: 'get',
    url: './php/getBrands.php',
})

.then(function successCallback(data) {
  $rootScope.brands = data.data;
  })
}

})
.config(function ($routeProvider) {
  $routeProvider.when("/admin", {
    templateUrl: "./views/admin.html"
  });

  $routeProvider.when("/profile", {
    templateUrl: "./views/myprofile.html"
  });

  $routeProvider.when("/products", {
    templateUrl: "./views/products.html"
  });

	$routeProvider.when("/checkout", {
	templateUrl: "./views/checkoutSummary.html"
	});

  $routeProvider.otherwise({
    templateUrl: "./views/app.html"
  });
})
.controller('appController', function($scope, $cookieStore, $window, $rootScope, $http, cart){
	$scope.getProductsOnAdd = function(item) {
	$http({
	    method: 'post',
	    url: './php/getProductsOnAdd.php',
			data : {
				product_id : item.product_id,
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.then(function successCallback(product) {
		$rootScope.getProductsFunction();
	  cart.addProduct(product.data[0].product_id, product.data[0].name, product.data[0].price);
	  })
	}
  $scope.getCountries = function() {
  $http({
    method: "get",
    url: './php/getCountries.php',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function successCallback(response) {
          $rootScope.countries = response.data;
        })};
  $rootScope.logout = function(){
  $cookieStore.remove('authenticated');
  $cookieStore.remove('user');
  $window.location.reload();
  }
  $scope.getCountries();
  $rootScope.getProductsFunction();
  $rootScope.getCategoriesFunction();
	$rootScope.getBrandsFunction();
  console.log($rootScope);
});
