angular.module('fqcApp').factory('AuthService', ['$http', '$q', 'FQC_PROPERTIES', '$localStorage','$window',
  function ($http, $q, FQC_PROPERTIES, $localStorage, $window) {
  return {
    login: function (credentials) {
      var deferredObject = $q.defer();
      $q.all([$http.post(FQC_PROPERTIES.host.url1 + 'auth/signin', credentials,{headers: {'Authorization': 'Bearer '}})]).then(function (response) {
        var formatted = response[0].data.token;

        if (formatted) {
          $localStorage.$reset({});
          $localStorage.$default({
            session_token: formatted
          });
          deferredObject.resolve(response);
        }
      }, function (error) {
        deferredObject.reject(error);
      });
      return deferredObject.promise;
    },
    isAuthenticated: function () {
      return !!$localStorage.session_token;
    },
    // getAuthenticatedUserInfo: function () {
    //   return $localStorage.userInfo;
    // },
    logout: function () {
      var deferredObject = $q.defer();
      $q.all([]).then(function (response) {
        $localStorage.$reset({});
        $window.localStorage.clear();
        deferredObject.resolve(response);
      });
      return deferredObject.promise;
    }
  };
}]);
