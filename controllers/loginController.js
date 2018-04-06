angular.module('myShop')
.controller('loginController', function($rootScope, $scope, $http, $cookieStore) {
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
                  $scope.getCompanies();
                  $scope.getShippingAdresses();
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
