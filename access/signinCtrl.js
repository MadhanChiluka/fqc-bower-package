'use strict';

/* Controllers */
// signin controller
angular.module('fqcApp').controller('SigninCtrl', ['$state', 'AuthService', '$rootScope', 'FQC_PROPERTIES', '$scope', '$http',  '$localStorage', 'toaster', '$window', '$sessionStorage', '$interval','fqcPrimaryData',
  function ($state, AuthService, $rootScope, FQC_PROPERTIES, $scope, $http,  $localStorage, toaster, $window, $sessionStorage, $interval, fqcPrimaryData) {
  var signin = this;
  $localStorage.$reset({});
  $window.localStorage.clear();
  if (AuthService.isAuthenticated()) {
    $rootScope.$broadcast(FQC_PROPERTIES.auth.loginSuccess);
  }
  // $rootScope.stop();
  // signin.user.password

  signin.user = {
    username: '',
    password: ''
  };


  signin.login = function (credentials) {
    // credentials.password = sha256(credentials.password);
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    function num1() {
      var text = "";
      for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
    function num2() {
      var text = "";
      for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }

    var password1 = sha256(credentials.password);
    var password2 = sha256(password1 + 'sharan');
    credentials.password = num1() +  password2 + num2()
    signin.user.password = credentials.password;
    signin.fqcPromise = AuthService.login(credentials).then(function (user) {
      fqcPrimaryData.loginData(user[0].data.user);
      $state.go('home.dashboard')
      // $localStorage.loginType='app';
      //console.log('encryption-->'+ signin.user.password);
    }, function (error) {

      toaster.pop({
        type: 'error',
        title: 'Login Failed',
        body: 'Please enter valid User Name and Password!'
      });
      signin.user.password = '';
    });
  };

  signin.signinPage = function () {
    $localStorage.$reset({});
    $window.localStorage.clear();
    // $sessionStorage.$reset();
    // Redirect to the create order view
    $state.go('access.gotoSignin');
  };

}]);
