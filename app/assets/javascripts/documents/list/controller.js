(function(){
    "use strict";

    angular
        .module("PANAH-APP")
        .controller("documentListController",documentListController)
        documentListController.$inject=['DocumentFactory'];

        function documentListController(DocumentFactory){
        	var vm = this;
            var page = 1;
            vm.documents = [];
            DocumentFactory.destroy_cache();
            vm.load_page = function(_page){
                DocumentFactory.all( _page,function(res){
                    vm.documents = res.data.results;
                    vm.total = res.data.total;
                });    
            }
        	DocumentFactory.all( page,function(res){
        		vm.documents = res.data.results;
                vm.total = res.data.total;
        	});
            vm.deleteDoc = deleteDoc;
            function deleteDoc(id,index){
                DocumentFactory.deleteDoc(id, function(res){
                    vm.documents.splice( index, 1);
                });
            }
        }

})()