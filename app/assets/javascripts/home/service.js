(function() {
    'use strict';

    angular
      .module('PANAH-APP')
      .factory('HomeFactory', HomeFactory );

      HomeFactory.$inject = ['Server'];

      function HomeFactory( Server ) {
        var f={};

        f.init = init;

        function init(k){
          Server.get('information').then(k, Server.error);
        }
        
        return f;
      }
})();
