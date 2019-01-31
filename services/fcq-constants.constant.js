'use strict';
angular.module('fqcApp').constant('FQC_PROPERTIES', {
  auth: {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    notAuthenticated: 'auth-not-authenticated'
  },
  host: {
   // for olms services
    prod: 'http://192.168.0.37:9094/olms/rest/',
    // for fqc services
    url: 'http://192.168.0.31:8088/api/',
    url1: 'http://192.168.0.31:8088/'

  }
})
