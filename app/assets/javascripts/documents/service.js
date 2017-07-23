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
        f.edit = edit;
        f.update = update;
        f.approve = approve;
        f.reject = reject;
        f.pending = pending;
        f.rejected = rejected;
        f.search = search;

        function search(data,k){
          Server.post('documents/search',{search:data}).then(k, function(){
            alert("failed to search");
          })
        }
        function pending(k){
          Server.get('documents/pending').then(k,function(){
            alert("Failed to get pending document");
          })
        }
        function rejected(k){
          Server.get('documents/rejected').then(k,function(){
            alert("Failed to get pending document");
          })
        }
        function reject(id,k){
          Server.post('document/reject/'+id).then( k,
            function(){
              alert("Failed to reject document");
            }
          )
        }
        function approve(id,k){
          Server.post('document/approve/'+id).then( k,
            function(){
              alert("Failed to approve document");
            }
          )
        }
        function update(id,document,k){
          Server.post('post/update/'+id,{document:document}).then(k,function(){
            alert("Failed to save");
          });
        }
        function edit(id,k){
          Server.get('document/'+id).then( k,function(){
            alert("Failed to view document");
          });
        }
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
