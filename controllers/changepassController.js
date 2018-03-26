angular.module('myShop')
.controller('changepassController', function($rootScope, $scope, $http){
  $scope.changePassData = {passwordold: null, passwordnew: null};
  $scope.changePassFunction = function() {
  $http({
      method: 'post',
      url: './php/changePass.php',
      data: {
      username : $rootScope.user[0].username,
      passwordold: $scope.changePassData.passwordold,
      passwordnew: $scope.changePassData.passwordnew,
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  .then(function successCallback(data){
    $scope.changePassResponse = data.data;
     if($scope.changePassResponse === 'Success'){
       swal ( "Success!",  "You password has been changed.",  "success" )
       $(function () {
         $('#changePassModal').modal('toggle');
       });
       return;
     }
     if($scope.changePassResponse === 'Incorrect password'){
       swal ( "Oops",  "Password is incorrect! Try again.",  "error" )
       return;
     }
     else {
       swal ( "Oops",  "Something went wrong! Try again.",  "error" )
       return;
     }
  })

}});
