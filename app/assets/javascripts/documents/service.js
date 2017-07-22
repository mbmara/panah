(function() {
    'use strict';

    angular
      .module('PANAH-APP')
      .factory('DocumentFactory', DocumentFactory );

      DocumentFactory.$inject = ['Server'];

      function DocumentFactory( Server ) {
        var f={};

        f.create = create;
        f.all = all;
        f.show= show;
        f.deleteDoc = deleteDoc;

        function deleteDoc(id,k){
          Server.post('document/delete/'+id).then(k,function(){
            alert("Failed to delete");
          });
        }
        function show(id,k){
          Server.get('document/'+id).then( k,function(){
            alert("Failed to view document");
          });
        }
        function all(k){
          Server.get("documents").then( k, function(res){
            console.log(res);
          });
        }
        function create(file,k){
          Server.post('post',{document:file}).then(k,function(){
            alert("Failed to save");
          });
        }

        return f;
      }
})();
