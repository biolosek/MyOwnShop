angular.module('myShop', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('myShop')
.run(function($rootScope, $cookieStore, $http){
  $rootScope.authenticated = $cookieStore.get('authenticated');
  $rootScope.user = $cookieStore.get('user');

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
    templateUrl: "./views/admin.html"
  });

  $routeProvider.when("/profile", {
    templateUrl: "./views/myprofile.html"
  });

  $routeProvider.otherwise({
    templateUrl: "./views/app.html"
  });
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
  $rootScope.logout = function(){
  $cookieStore.remove('authenticated');
  $cookieStore.remove('user');
  $window.location.reload();
  }
  $scope.getCountries();
});
