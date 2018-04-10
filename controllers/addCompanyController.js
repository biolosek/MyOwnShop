angular.module('myShop')
.controller('addCompanyController', function($rootScope, $scope, $http){
  $scope.addCompanyData = {name: null, nip: null, adress: null, postalcode: null, city: null};
  $scope.addCompanyFunction = function() {
  $http({
      method: 'post',
      url: './php/addCompany.php',
      data: {
      name: $scope.addCompanyData.name,
      nip: $scope.addCompanyData.nip,
      adress: $scope.addCompanyData.adress,
      postalcode: $scope.addCompanyData.postalcode,
      city: $scope.addCompanyData.city,
      account_id: $rootScope.user[0].account_id,
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  .then(function successCallback(data){
    $scope.addCompanyResponse = data.data;
     if($scope.addCompanyResponse === 'Success'){
       swal ( "Udało się!",  "Nowa firma została dodana.",  "success" )
       $(function () {
         $('#addCompanyModal').modal('toggle');
       });
       $rootScope.getCompanies();
       return;
     }
     if($scope.addCompanyResponse === 'Duplicate nip entry'){
       swal ( "Upsss",  "Firma o tym numerze NIP już istnieje.",  "error" )
       $rootScope.getCompanies();
       return;
     }
     else {
       swal ( "Oops",  "Something went wrong! Try again.",  "error" )
       $rootScope.getCompanies();
       return;
     }
  })

}});
