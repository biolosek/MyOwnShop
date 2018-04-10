angular.module('myShop')
.controller('addShippingController', function($rootScope, $scope, $http){
  $scope.addShippingData = {name: null, data: null, adress: null, postalcode: null, city: null};
  $scope.addShippingFunction = function() {
  $http({
      method: 'post',
      url: './php/addShipping.php',
      data: {
      name: $scope.addShippingData.name,
      data: $scope.addShippingData.data,
      adress: $scope.addShippingData.adress,
      postalcode: $scope.addShippingData.postalcode,
      city: $scope.addShippingData.city,
      account_id: $rootScope.user[0].account_id,
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  .then(function successCallback(data){
    $scope.addShippingResponse = data.data;
     if($scope.addShippingResponse === 'Success'){
       swal ( "Udało się!",  "Nowa adres dostawy został dodany.",  "success" )
       $(function () {
         $('#addShippingModal').modal('toggle');
       });
       $rootScope.getShippingAdresses();
       return;
     }
     else {
       swal ( "Oops",  "Something went wrong! Try again.",  "error" )
        $rootScope.getShippingAdresses();
       return;
     }
  })

}});
