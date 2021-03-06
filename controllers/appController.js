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

	$rootScope.getUserOrders = function () {
	$http({
			method: 'post',
			url: './php/getUserOrders.php',
			data: {
			account_id: $rootScope.user[0].account_id,
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.then(function successCallback(data){
		$rootScope.userOrders = data.data;
		$rootScope.userOrders.date_placed =  new Date(data.data[0].date_placed);
	})
}

  $rootScope.authenticated = $cookieStore.get('authenticated');
  $rootScope.user = $cookieStore.get('user');
	$rootScope.companies = $cookieStore.get('companies');
	$rootScope.shippings = $cookieStore.get('shippings');
		if ($rootScope.authenticated == 1) {
			$rootScope.getUserOrders();
		}

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
    templateUrl: "./views/admin.html",
		controller: "adminController"
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
.filter('startOf', function() {
	return function(input, currentPage, perPageProfile) {
		return input.slice((currentPage-1) * perPageProfile, perPageProfile * currentPage);
	}
})
.filter("dateOnly", function(){
		return function(input){
				return input.split(' ')[0]; // you can filter your datetime object here as required.
		};
})
.controller('adminController', function($scope, $http) {
	$scope.allOrdersFunction = function () {
		$http({
			method: 'get',
			url: './php/getAllOrders.php',
		}).then(function successCallback(data){
			$scope.allOrders = data.data;
		})
	}
	$scope.allUsersFunction = function () {
		$http({
			method: 'get',
			url: './php/getAllUsers.php',
		}).then(function successCallback(data){
			$scope.allUsers = data.data;
		})
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
		if (data.data[0].images != null){
		$scope.myArray = data.data[0].images.split(",");
		}
		$scope.singleProduct.images = [];
		angular.forEach($scope.myArray, function(value, key) {
		  $scope.singleProduct.images.push(value);
		});
	})
})
.controller('appController', function($scope, $cookieStore, $window, $rootScope, $http, cart, $timeout){
	$scope.startEdit = function (product) {
	$scope.editedProduct = product;
}

$scope.cancelEdit = function () {
	$scope.editedProduct = null;
}
	$scope.invoice_type = 0;
	$scope.company = {company_id : null, name: null, nip: null, adress: null, postalcode: null, city: null}
	$scope.shipping = {shipping_adress_id : null, name: null, data: null, adress: null, postalcode: null, city: null};
	$scope.orderData = {invoice_name: null, invoice_company_name: $scope.company.name, invoice_nip: $scope.company.nip, invoice_adress: null, invoice_postalcode: null, invoice_city: null,
	shipping_name: null, shipping_adress: null, shipping_postalcode: null, shipping_city: null, user_company: $scope.company.company_id, user_shipping: $scope.shipping.shipping_adress_id, account_id: null};
	$scope.$watch('invoice_type', function () {
		if ($scope.invoice_type == 0 && $rootScope.authenticated == 0) {
			$scope.orderData = {invoice_name: null, invoice_company_name: $scope.company.name, invoice_nip: $scope.company.nip, invoice_adress: null, invoice_postalcode: null, invoice_city: null,
			shipping_name: null, shipping_adress: null, shipping_postalcode: null, shipping_city: null, user_company: $scope.company.company_id, user_shipping: $scope.shipping.shipping_adress_id, account_id: null};
		}
		if ($scope.invoice_type == 0 && $rootScope.authenticated == 1) {
			$scope.orderData = {invoice_name: $rootScope.user[0].firstname + ' ' + $rootScope.user[0].lastname, invoice_company_name: null, invoice_nip: null, invoice_adress: $rootScope.user[0].adress, invoice_postalcode: $rootScope.user[0].postalcode, invoice_city: $rootScope.user[0].city,
			shipping_name: $rootScope.user[0].name, shipping_adress:$rootScope.user[0].adress, shipping_postalcode: $rootScope.user[0].postalcode, shipping_city: $rootScope.user[0].city, user_company: null, user_shipping: $scope.shipping.shipping_adress_id, account_id: $rootScope.user[0].account_id};
		}
		if ($scope.invoice_type == 1 && $rootScope.authenticated == 0) {
			$scope.orderData = {invoice_name: null, invoice_company_name: $scope.company.name, invoice_nip: $scope.company.nip, invoice_adress: null, invoice_postalcode: null, invoice_city: null,
			shipping_name: null, shipping_adress: null, shipping_postalcode: null, shipping_city: null, user_company: $scope.company.company_id, user_shipping: $scope.shipping.shipping_adress_id, account_id: null};
		}
		if ($scope.invoice_type == 1 && $rootScope.authenticated == 1) {
			$scope.orderData = {invoice_name: $rootScope.user[0].firstname + ' ' + $rootScope.user[0].lastname, invoice_company_name: $scope.company.name, invoice_nip: $scope.company.nip, invoice_adress: $scope.company.adress, invoice_postalcode: $scope.company.postalcode, invoice_city: $scope.company.city,
			shipping_name: $scope.shipping.name, shipping_adress: $scope.shipping.adress, shipping_postalcode: $scope.shipping.postalcode, shipping_city: $scope.shipping.city, user_company: $scope.company.company_id, user_shipping: $scope.shipping.shipping_adress_id, account_id: $rootScope.user[0].account_id};
		}
	})
	$scope.$watch('shippingId', function() {
		if ($scope.shippingId == null && $rootScope.authenticated == 0 || $scope.shippingId == undefined && $rootScope.authenticated == 0) {
			$scope.orderData = {invoice_name: null, invoice_company_name: $scope.company.name, invoice_nip: $scope.company.nip, invoice_adress: null, invoice_postalcode: null, invoice_city: null,
			shipping_name: null, shipping_adress: null, shipping_postalcode: null, shipping_city: null, user_company: $scope.company.company_id, user_shipping: $scope.shipping.shipping_adress_id, account_id: null};
		}
		if ($scope.shippingId == null && $rootScope.authenticated == 1 || $scope.shippingId == undefined && $rootScope.authenticated == 1) {
			$scope.orderData = {invoice_name: $rootScope.user[0].firstname + ' ' + $rootScope.user[0].lastname, invoice_company_name: $scope.company.name, invoice_nip: $scope.company.nip, invoice_adress: $rootScope.user[0].adress, invoice_postalcode: $rootScope.user[0].postalcode, invoice_city: $rootScope.user[0].city,
			shipping_name: $rootScope.user[0].firstname + ' ' + $rootScope.user[0].lastname, shipping_adress:$rootScope.user[0].adress, shipping_postalcode: $rootScope.user[0].postalcode, shipping_city: $rootScope.user[0].city, user_company: $scope.company.company_id, user_shipping: $scope.shipping.shipping_adress_id, account_id: $rootScope.user[0].account_id};
		}
		if ($scope.shippingId != null) {
			$scope.shipping = $rootScope.shippings[$scope.shippingId];
		$scope.orderData = {invoice_name: $rootScope.user[0].firstname + ' ' + $rootScope.user[0].lastname, invoice_company_name: $scope.company.name, invoice_nip: $scope.company.nip, invoice_adress: $rootScope.user[0].adress, invoice_postalcode: $rootScope.user[0].postalcode, invoice_city: $rootScope.user[0].city,
		shipping_name: $scope.shipping.name, shipping_adress: $scope.shipping.adress, shipping_postalcode: $scope.shipping.postalcode, shipping_city: $scope.shipping.city, user_company: $scope.company.company_id, user_shipping: $scope.shipping.shipping_adress_id, account_id: $rootScope.user[0].account_id};
		}
	})
	$scope.companyId = null;
	$scope.$watch('companyId', function() {
		if ($scope.companyId != null) {
			$scope.company = $rootScope.companies[$scope.companyId];
		$scope.orderData = {invoice_name: $rootScope.user[0].firstname + ' ' + $rootScope.user[0].lastname, invoice_company_name: $scope.company.name, invoice_nip: $scope.company.nip, invoice_adress: $scope.company.adress, invoice_postalcode: $scope.company.postalcode, invoice_city:  $scope.company.city,
		shipping_name: $scope.shipping.name, shipping_adress: $scope.shipping.adress, shipping_postalcode: $scope.shipping.postalcode, shipping_city: $scope.shipping.city, user_company: $scope.company.company_id, user_shipping: $scope.shipping.shipping_adress_id, account_id: $rootScope.user[0].account_id};
		}
	})
	$scope.placeOrderFunction = function(form) {
	$http({
		method: "post",
		url: './php/placeOrder.php',
		data: {
				invoice_name: $scope.orderData.invoice_name,
				invoice_company_name: $scope.orderData.invoice_company_name,
				invoice_nip: $scope.orderData.invoice_nip,
				invoice_adress: $scope.orderData.invoice_adress,
				invoice_postalcode: $scope.orderData.invoice_postalcode,
				invoice_city: $scope.orderData.invoice_city,
				shipping_name: $scope.orderData.shipping_name,
				shipping_adress: $scope.orderData.shipping_adress,
				shipping_postalcode: $scope.orderData.shipping_postalcode,
				shipping_city: $scope.orderData.shipping_city,
				user_company: $scope.orderData.user_company,
				user_shipping: $scope.orderData.user_shipping,
				account_id: $scope.orderData.account_id,
				total: $scope.total(),
				payment_status: 'pending',
				shipping_status: 'pending',
				cartdata: cartData,
		},
		headers: { 'Content-Type': 'application/json' }
	}).then(function successCallback(data) {
					$scope.placeOrderResponse = data.data;
					if ($scope.placeOrderResponse == 'Success') {
						swal ( "Udało się!",  "Zamówienie zostało złożone.",  "success" )
						if ($rootScope.authenticated == 1){
						$rootScope.getUserOrders();
					}
						$cookieStore.remove('cartData');
						cartData = {};
						return;
					}
					else {
						swal ( "Oops",  "Coś poszło nie tak, spróbuj ponownie.",  "error" )
						return;
					}
				})
		}

	$scope.editCompanyFunction = function (item) {
			$scope.editCompany = item;
	}
	$scope.cancelEditCompany = function () {
		$(function () {
			$('#editCompanyModal').modal('toggle');
		});
		$rootScope.getCompanies();
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
	$scope.cancelEditShipping = function () {
		$(function () {
			$('#editShippingModal').modal('toggle');
		});
		$rootScope.getShippingAdresses();
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

	$scope.currentPageOrders = 1;
	$scope.currentPageCompany = 1;
	$scope.currentPageShipping = 1;
  $scope.currentPage = 1;
	$scope.perPage = 8;
	$scope.perPageProfile = 5;
  $scope.maxSize = 3;

	$scope.getProductsFunction = function() {
	$http({
	    method: 'get',
	    url: './php/getProducts.php',
	}).then(function successCallback(data) {
	  $scope.products = data.data;
	  })
	}

	$scope.getBrandsFunction = function() {
	$http({
	    method: 'get',
	    url: './php/getBrands.php',
	}).then(function successCallback(data) {
	  $scope.brands = data.data;
	  })
	}

	$scope.getCategoriesFunction = function() {
	$http({
	    method: 'get',
	    url: './php/getCategories.php',
	}).then(function successCallback(data) {
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
	}).then(function successCallback(product) {
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
	}).then(function successCallback(data) {
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
