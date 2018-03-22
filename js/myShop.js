angular.module('myShop', ['ngCookies', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('myShop')
.run(function($rootScope, $cookieStore){
  $rootScope.authenticated = $cookieStore.get('authenticated');
  $rootScope.user = $cookieStore.get('user');
})
.controller('appController', function($scope, $cookieStore, $window, $rootScope, $http){
  $scope.getCountries = function() {
  $http({
    method: "get",
    url: './php/getCountries.php',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function successCallback(response) {
          $rootScope.countries = response.data;
        })};
  $scope.logout = function(){
  $cookieStore.remove('authenticated');
  $cookieStore.remove('user');
  $window.location.reload();
  }
  $scope.getCountries();
})
.controller('registerController', function($scope, $http, $cookieStore) {
  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
  $scope.registerData = {firstname : null, lastname : null, login: null, password : null, email : null, city : null, postalcode : null, adress: null, country: null};

  $scope.registerFunction = function() {
  $http({
    method: "post",
    url: './php/registration.php',
    data: {
        firstname: $scope.registerData.firstname,
        lastname: $scope.registerData.lastname,
        login: $scope.registerData.login,
        password: $scope.registerData.password,
        email: $scope.registerData.email,
        city: $scope.registerData.city,
        postalcode: $scope.registerData.postalcode,
        adress: $scope.registerData.adress,
        country: $scope.registerData.country,
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function successCallback(response) {
          $scope.registerResponse = response.data;
          if ($scope.registerResponse === 'Duplicate login entry') {
            swal ( "Oops",  "Account with this login already exists!",  "error" )
            return;
          }
          if ($scope.registerResponse === 'Duplicate e-mail entry') {
            swal ( "Oops",  "Account with this e-mail already exists!",  "error" )
            return;
          }
          if ($scope.registerResponse === 'Success') {
            swal ( "Yeah!",  "Your account has been registered!",  "success" )
            return;
          }
          else {
            swal ( "Oops",  "Something went wrong, try again!",  "error" )
            return;
          }
        })
    }})

.controller('loginController', function($rootScope, $scope, $http, $cookieStore) {
      this.loginForm = function() {
          var encodedString = 'login=' +
              encodeURIComponent(this.inputData.login) +
              '&password=' +
              encodeURIComponent(this.inputData.password);

          $http({
              method: 'POST',
              url: './php/login.php',
              data: encodedString,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })

          .then(function successCallback(data) {
            $rootScope.user = data.data;
                if ($rootScope.user[0].account_id > 0) {
                  $rootScope.authenticated = true;
                  swal ( "Success!",  "You have been succesfully logged in.",  "success" )
                  $(function () {
                    $('#loginModal').modal('toggle');
                  });
                  $cookieStore.put('authenticated', $rootScope.authenticated);
                  $cookieStore.put('user', $rootScope.user);
                  return;
                }
                if ($rootScope.user === 'wrong') {
                  swal ( "Oops",  "Username or password is incorrect! Try again.",  "error" )
                  return;
                }
                else {
                  swal ( "Oops",  "Something went wrong, try again!",  "error" )
                  return;
                }
            })
  }
    });
