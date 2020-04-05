(function () {

  function Http($q, $http, $state, Message, $rootScope) {
    let serverPath = 'http://' + window.location.hostname + ':6544';
    let localPath = 'http://' + window.location.hostname + ':3009';

    function logout() {
      return $http.post(serverPath + "/api/sign-out", {}).then(function (response) {
        if (response.data.code === 1) {
          $rootScope._menu = false;
          delete localStorage.userData;
          delete $rootScope.userData;
          return $state.go("sign-in");
        } else {
          Message.error("Something went wrong");
        }
      })
    }

    return {
      get: function (path, parameters) {
        $("#loader").show();
        let deferred = $q.defer();
        let transform = function (data) {
          return $.param(data)
        };
        $http({
          url: parameters == 'local' ? localPath + path : serverPath + path,
          method: "GET",
          params: parameters,
          withCredentials: true
        }).then(function (response) {
          $("#loader").hide();
          if (typeof response.data.code != "undefined") {
            if (response.data.code == 5) {
              return logout();
            }
          }
          deferred.resolve(response.data)
        }).catch(function (response) {
          $("#loader").hide();
          deferred.reject(response)
        });
        return deferred.promise
      },
      post: function (path, parameters) {
        $("#loader").show();
        let deferred = $q.defer();
        let transform = function (data) {
          return $.param(data)
        };
        $http.post(serverPath + path, parameters, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          transformRequest: transform,
          withCredentials: true
        }).then(function (response) {
          $("#loader").hide();
          if (typeof response.data.code != "undefined") {
            if (response.data.code == 5) {
              return logout();
            }
          }
          deferred.resolve(response.data)
        }).catch(function (response) {
          $("#loader").hide();
          deferred.reject(response)
        });
        return deferred.promise
      },
      update: function (url, parameter) {

      },
      delete: function (url, parameter) {

      },
      uploadBlob: function (url, parameter) {

      },
      getLocal: function (path, parameters) {
        $("#loader").show();
        let deferred = $q.defer();
        let transform = function (data) {
          return $.param(data)
        };
        $http({
          url: localPath + path,
          method: "GET",
          params: parameters,
          withCredentials: true
        }).then(function (response) {
          $("#loader").hide();
          if (typeof response.data.code != "undefined") {
            if (response.data.code == 5) {
              return logout();
            }
          }
          deferred.resolve(response.data)
        }).catch(function (response) {
          $("#loader").hide();
          deferred.reject(response)
        });
        return deferred.promise
      },
    }
  }

  angular.module("app").factory("Http", Http);
})();
