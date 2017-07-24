(function() {
    'use strict';

    angular
      .module('PANAH-APP')
      .factory('Server', serverService);

      serverService.$inject = ['$http','$window','$localStorage'];

      function serverService( $http, $window ,$localStorage) {
        var f = {}, version = "api/v1";
        $http.defaults.headers.common['Authorization'] = $localStorage.uuid || 0;
        f.post = function( route,params){
          var request = $http.post(version+"/"+route+".json",params);
          return request;
    		};

        f.get = function(route){
          var request = $http.get(version+"/"+route+".json");
          return request;
    		};
        f.setToken = function( obj ){
          $localStorage.uuid = obj.token;
        }
        f.token = function(){
          return $localStorage.uuid;
        }
        f.error = function(){
          alert("Server connection failed.. Please try again!");
        }
        return f;
      }
})();
