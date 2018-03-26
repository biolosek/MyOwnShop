angular.module('myShop')
.controller('registerController', function($scope, $http, $cookieStore) {
  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
  $scope.registerData = {firstname : null, lastname : null, username: null, password : null, email : null, city : null, postalcode : null, adress: null, country: null};

  $scope.registerFunction = function() {
  $http({
    method: "post",
    url: './php/registration.php',
    data: {
        firstname: $scope.registerData.firstname,
        lastname: $scope.registerData.lastname,
        username: $scope.registerData.username,
        password: $scope.registerData.password,
        email: $scope.registerData.email,
        city: $scope.registerData.city,
        postalcode: $scope.registerData.postalcode,
        adress: $scope.registerData.adress,
        country: $scope.registerData.country,
    },
    headers: { 'Content-Type': 'application/json' }
  }).then(function successCallback(data) {
          $scope.registerResponse = data.data;
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
            $(function () {
              $('#registerModal').modal('toggle');
            });
            return;
          }
          else {
            swal ( "Oops",  "Something went wrong, try again!",  "error" )
            return;
          }
        })
    }});
