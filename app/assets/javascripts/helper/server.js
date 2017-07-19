(function() {
    'use strict';

    angular
      .module('PANAH-APP')
      .factory('Server', serverService);

      serverService.$inject = ['$http','$window'];

      function serverService( $http, $window ) {
        var f = {}, version = "api/v1";
        //var token = $window.document.getElementsByName('aplus-token')[0].content;
        //$http.defaults.headers.common['Authorization'] = token;
        f.post = function( route,params){
          var request = $http.post(version+"/"+route+".json",params);
          return request;
    		};

        f.get = function(route){
          var request = $http.get(version+"/"+route+".json");
          return request;
    		};
        return f;
      }
})();
