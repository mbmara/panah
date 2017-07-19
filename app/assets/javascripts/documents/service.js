(function() {
    'use strict';

    angular
      .module('PANAH-APP')
      .factory('DocumentFactory', DocumentFactory );

      DocumentFactory.$inject = ['Server'];

      function DocumentFactory( Server ) {
        var f={};

        f.create = create;

        function create(file,k){
          Server.post('post',{document:file}).then(k,function(){
            alert("Failed to save");
          });
        }

        return f;
      }
})();
