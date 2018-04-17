angular.module('myShop')
.controller('forgotPasswordController', function($scope, $http) {
  $scope.emailFormatForgot = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
  $scope.forgotPasswordData = {username: null, email: null};

  $scope.doIT = function(){
    console.log($scope.forgotPasswordData.email);
  }

  $scope.forgotPassword = function () {
    $http({
      method: "post",
      url: "./php/forgotPassword.php",
      data: {
        username: $scope.forgotPasswordData.username,
        email: $scope.forgotPasswordData.email,
      },
      headers: { 'Content-Type': 'application/json' }
    }).then(function successCallback(data) {
      $scope.forgotPasswordResponse = data.data;
    })
  }});
