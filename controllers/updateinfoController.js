angular.module('myShop')
.controller('updateinfoController', function($rootScope, $scope, $http){
  $scope.updateinfoFunction = function() {
  $http({
      method: 'post',
      url: './php/updateInfo.php',
      data: {
      account_id : $rootScope.user[0].account_id,
      username : $rootScope.user[0].username,
      firstname: $rootScope.user[0].firstname,
      lastname: $rootScope.user[0].lastname,
      email: $rootScope.user[0].email,
      city: $rootScope.user[0].city,
      postalcode: $rootScope.user[0].postalcode,
      adress: $rootScope.user[0].adress,
      country: $rootScope.user[0].country,
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  .then(function successCallback(data){
    $scope.updateInfoResponse = data.data;
     if($scope.updateInfoResponse === 'Success'){
       $rootScope.getUserInfo();
       swal ( "Success!",  "Account information has been updated",  "success" )
       return;
     }
     if($scope.updateInfoResponse === 'Something went wrong'){
       swal ( "Oops",  "Something went wrong! Try again.",  "error" )
       return;
     }
     else {
       swal ( "Oops",  "Something went wrong! Try again.",  "error" )
       return;
     }
  })

}});
