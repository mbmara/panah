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
        f.home_search = home_search;
        f.byYear  = byYear;

        function byYear(obj,k){
          Server.post('documents/by_year',{year:obj}).then(k,Server.error);
        }
        function home_search(data,k){
          Server.post('documents/homeSearch',{search:data}).then(k,Server.error);
        }
        function search(data,k){
          Server.post('documents/search',{search:data}).then(k,Server.error)
        }
        function pending(k){
          Server.get('pending').then(k,function(){
            alert("Failed to get pending document");
          })
        }
        function rejected(k){
          Server.get('rejected').then(k,function(){
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
        function all(page,k){
          Server.get("documents/"+page).then( k,Server.error);
        }
        function create(file,k){
          Server.post('post',{document:file}).then(k,Server.error);
        }

        return f;
      }
})();
