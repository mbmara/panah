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
        f.getTagMatches = getTagMatches;
        f.destroy_cache = destroy_cache;
        f.destroy_home_search = destroy_home_search;
        f.destroy_adv_search = destroy_adv_search;
        f.listFilter = listFilter;

        function listFilter(data,k){
          Server.post('listFilter',{search:data}).then(k,Server.error)
        }
        function destroy_home_search(){
          delete f.cache;
          delete f.cache_search;
        }
        function destroy_adv_search(){
          delete f.search_cache2;
          delete f.search_cache_data;
        }
        function destroy_cache(){
          delete f.cache;
          delete f.cache_search;
          delete f.search_cache2;
          delete f.search_cache_data;
          console.log("cleared");
        }
        function getTagMatches(tag,k){
          Server.get('getTagMatch/'+tag).then(k,Server.error);
        }
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
