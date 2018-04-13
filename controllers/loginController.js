angular.module('myShop')
.controller('loginController', function($rootScope, $scope, $http, $cookieStore) {
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
            $cookieStore.remove('orders');
            $cookieStore.put('orders', $rootScope.userOrders);
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
          $rootScope.getCompanies = function() {
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
          $scope.loginData = {username: null, password: null};
          $scope.loginFunction = function() {
          $http({
              method: 'post',
              url: './php/login.php',
              data: {
              username: $scope.loginData.username,
              password: $scope.loginData.password,
              },
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })

          .then(function successCallback(data) {
            $scope.myResponse = data.data;
                if ($scope.myResponse != undefined && $scope.myResponse[0].account_id != undefined && $scope.myResponse[0].account_id != 0) {
                  $rootScope.user = $scope.myResponse;
                  $rootScope.authenticated = true;
                  swal ( "Success!",  "You have been succesfully logged in.",  "success" )
                  $(function () {
                    $('#loginModal').modal('toggle');
                  });
                  $cookieStore.put('authenticated', $rootScope.authenticated);
                  $cookieStore.put('user', $rootScope.user);
                  $scope.orderData = {invoice_name: $rootScope.user[0].firstname + ' ' + $rootScope.user[0].lastname, invoice_company_name: $scope.company.name, invoice_nip: $scope.company.nip, invoice_adress: $rootScope.user[0].adress, invoice_postalcode: $rootScope.user[0].postalcode, invoice_city: $rootScope.user[0].city,
                  shipping_name: $rootScope.user[0].firstname + ' ' + $rootScope.user[0].lastname, shipping_adress:$rootScope.user[0].adress, shipping_postalcode: $rootScope.user[0].postalcode, shipping_city: $rootScope.user[0].city, user_company: $scope.company.company_id, user_shipping: $scope.shipping.shipping_adress_id, account_id: $rootScope.user[0].account_id};
                  $scope.getCompanies();
                  $scope.getShippingAdresses();
                  $rootScope.getUserOrders();
                  return;
                }
                if ($scope.myResponse === 'Wrong password') {
                  swal ( "Oops",  "Password is incorrect! Try again.",  "error" )
                  return;
                }
                if ($scope.myResponse === 'No account') {
                  swal ( "Oops",  "There is no account with this username! Try again.",  "error" )
                  return;
                }
                else {
                  swal ( "Oops",  "Something went wrong, try again!",  "error" )
                  return;
                }
            })
  }});
