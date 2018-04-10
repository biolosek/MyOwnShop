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
.directive("informations", function () {
  return {
          restrict: "E",
          templateUrl: "./views/informations.html",
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
	$rootScope.companies = $cookieStore.get('companies');
	$rootScope.shippings = $cookieStore.get('shippings');
	$rootScope.productView = $cookieStore.get('productView');

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

	$routeProvider.when("/placeorder", {
	templateUrl: "./views/placeOrder.html"
	});

  $routeProvider.otherwise({
    templateUrl: "./views/app.html"
  });

	$routeProvider.when("/product/:product_id", {
		templateUrl: "./views/productDetails.html",
		controller: 'productViewController'
	});
})
.filter('startFrom', function() {
	return function(input, currentPage, perPage) {
		return input.slice((currentPage-1) * perPage, perPage * currentPage);
	}
})
.controller('productViewController', function($scope, $routeParams, $http) {
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.active = 0;
	var currIndex = 0;
	$http({
			method: 'post',
			url: './php/getSingleProduct.php',
			data: {
			product_id: $routeParams.product_id,
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.then(function successCallback(data){
		$scope.singleProduct = data.data[0];
		$scope.myArray = data.data[0].images.split(",");
		$scope.singleProduct.images = [];
		angular.forEach($scope.myArray, function(value, key) {
		  $scope.singleProduct.images.push(value);
		});
		console.log($scope.singleProduct.images);
	})
})
.controller('appController', function($scope, $cookieStore, $window, $rootScope, $http, cart, $timeout){
	$scope.editCompanyFunction = function (item) {
			$scope.editCompany = item;
	}
	$scope.confirmEditCompany = function () {
		$http({
				method: 'post',
				url: './php/editCompany.php',
				data: {
				company_id: $scope.editCompany.company_id,
				name: $scope.editCompany.name,
				nip: $scope.editCompany.nip,
				adress: $scope.editCompany.adress,
				postalcode: $scope.editCompany.postalcode,
				city: $scope.editCompany.city,
				account_id: $rootScope.user[0].account_id,
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function successCallback(data){
			$scope.editCompanyResponse = data.data;
			 if($scope.editCompanyResponse === 'Success'){
				 swal ( "Udało się!",  "Firma została zmieniona.",  "success" )
				 $rootScope.getCompanies();
				 $(function () {
	         $('#editCompanyModal').modal('toggle');
	       });
				 return;
			 }
			 if($scope.editCompanyResponse === "Duplicate nip entry") {
				 swal ( "Oops",  "Firma o tym numerze nip już istnieje.",  "error" )
				 $rootScope.getCompanies();
				 return;
			 }
			 else {
				 swal ( "Oops",  "Something went wrong! Try again.",  "error" )
				 $rootScope.getCompanies();
				 return;
			 }
		})
	}
	$scope.editShippingFunction = function (item) {
			$scope.editShipping = item;
	}
	$scope.confirmEditShipping = function () {
		$http({
				method: 'post',
				url: './php/editShipping.php',
				data: {
				shipping_adress_id: $scope.editShipping.shipping_adress_id,
				name: $scope.editShipping.name,
				data: $scope.editShipping.data,
				adress: $scope.editShipping.adress,
				postalcode: $scope.editShipping.postalcode,
				city: $scope.editShipping.city,
				account_id: $rootScope.user[0].account_id,
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function successCallback(data){
			$scope.editShippingResponse = data.data;
			 if($scope.editShippingResponse === 'Success'){
				 swal ( "Udało się!",  "Adres dostawy został zmieniony.",  "success" )
				 $rootScope.getShippingAdresses();
				 $(function () {
	         $('#editShippingModal').modal('toggle');
	       });
				 return;
			 }
			 else {
				 swal ( "Oops",  "Something went wrong! Try again.",  "error" )
				 $rootScope.getShippingAdresses();
				 return;
			 }
		})
	}
	$scope.removeShippingFunction = function(item) {
	$http({
			method: 'post',
			url: './php/removeShipping.php',
			data: {
			account_id: $rootScope.user[0].account_id,
			shipping_adress_id: item.shipping_adress_id,
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.then(function successCallback(data){
		$scope.removeShippingResponse = data.data;
		 if($scope.removeShippingResponse === 'Success'){
			 swal ( "Udało się!",  "Adres dostawy został usunięty.",  "success" )
			 $rootScope.getShippingAdresses();
			 return;
		 }
		 else {
			 swal ( "Oops",  "Something went wrong! Try again.",  "error" )
			 return;
		 }
	})
}
$scope.removeCompanyFunction = function(item) {
$http({
		method: 'post',
		url: './php/removeCompany.php',
		data: {
		account_id: $rootScope.user[0].account_id,
		company_id: item.company_id,
		},
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
.then(function successCallback(data){
	$scope.removeCompanyResponse = data.data;
	 if($scope.removeCompanyResponse === 'Success'){
		 swal ( "Udało się!",  "Firma została usunięta.",  "success" )
		 $rootScope.getCompanies();
		 return;
	 }
	 else {
		 swal ( "Oops",  "Something went wrong! Try again.",  "error" )
		 return;
	 }
})
}
	$scope.shipping = {shipping_adress_id : null, name: null, data: null, adress: null, postalcode: null, city: null}
	$rootScope.getShippingAdresses = function (){
		$http({
				method: 'post',
				url: './php/getShippingAdresses.php',
				data: {
				account_id: $rootScope.user[0].account_id,
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function successCallback(response) {
			$rootScope.shippings = response.data;
			$cookieStore.remove('shippings');
			$cookieStore.put('shippings', $rootScope.shippings);
		})
	}
	$scope.company = {company_id : null, name: null, nip: null, adress: null, postalcode: null, city: null}
	$rootScope.getCompanies = function (){
		$http({
				method: 'post',
				url: './php/getCompanies.php',
				data: {
				account_id: $rootScope.user[0].account_id,

				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function successCallback(response) {
			$rootScope.companies = response.data;
			$cookieStore.remove('companies');
			$cookieStore.put('companies', $rootScope.companies);
		})
	}
	$scope.form = 0;
	 $timeout( function(){
		 $scope.totalItems = $scope.products.length;
	 }, 1000 );

	$scope.currentPageCompany = 1;
	$scope.currentPageShipping = 1;
  $scope.currentPage = 1;
	$scope.perPage = 8;
  $scope.maxSize = 3;

	$scope.getProductsFunction = function() {
	$http({
	    method: 'get',
	    url: './php/getProducts.php',
	})

	.then(function successCallback(data) {
	  $scope.products = data.data;
	  })
	}
	$scope.getBrandsFunction = function() {
	$http({
	    method: 'get',
	    url: './php/getBrands.php',
	})

	.then(function successCallback(data) {
	  $scope.brands = data.data;
	  })
	}

	$scope.getCategoriesFunction = function() {
	$http({
	    method: 'get',
	    url: './php/getCategories.php',
	})

	.then(function successCallback(data) {
	  $scope.categories = data.data;
	  })
	}
	$scope.updateCartData = function() {
		$cookieStore.remove('cartData');
		$cookieStore.put('cartData', cartData);
	};
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
		$scope.getProductsOnFilters();
	  cart.addProduct(product.data[0].product_id, product.data[0].name, product.data[0].price);
	  })
	}
	$scope.getProductsOnFilters = function() {
		var categories = [];
		angular.forEach($scope.categories, function(val) {
			if (val.checked) categories.push(parseInt(val.category_id));
		})
		var brands = [];
		angular.forEach($scope.brands, function(val) {
			if (val.checked) brands.push(parseInt(val.brand_id));
		})
	$http({
	    method: 'post',
	    url: './php/getProductsOnFilters.php',
			data : {
				categories : categories,
				brands : brands,
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.then(function successCallback(data) {
		$scope.filtersResponse = data.data;
		if(angular.isArray($scope.filtersResponse)){
			$scope.products = $scope.filtersResponse;
			return;
		}
		else {
			$scope.getProductsFunction();
			swal ( "Oops",  "There was an error while applying the filters, try again!",  "error" );
			$scope.productsfilters = {categories: [],  brands: []};
		}

	  })
	}
	$scope.placeOrderFunction = function() {
	$http({
			method: 'post',
			url: './php/placeOrder.php',
			data : {
				cartdata : $scope.cartData,
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.then(function successCallback(response) {
		})
	}
  $scope.getCountries = function() {
  $http({
    method: "get",
    url: './php/getCountries.php',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function successCallback(response) {
          $scope.countries = response.data;
        })};
  $rootScope.logout = function(){
  $cookieStore.remove('authenticated');
  $cookieStore.remove('user');
	$cookieStore.remove('companies');
	$cookieStore.remove('shippings');
  $window.location.reload();
  }
  $scope.getCountries();
  $scope.getProductsFunction();
  $scope.getCategoriesFunction();
	$scope.getBrandsFunction();

	$scope.$watch('categories', function() {
		$scope.getProductsOnFilters();
	}, true);
	$scope.$watch('brands', function() {
		$scope.getProductsOnFilters();
	}, true);
});
