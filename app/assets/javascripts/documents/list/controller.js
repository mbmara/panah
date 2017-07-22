(function(){
    "use strict";

    angular
        .module("PANAH-APP")
        .controller("documentListController",documentListController)
        documentListController.$inject=['DocumentFactory'];

        function documentListController(DocumentFactory){
        	var vm = this;

            vm.documents = [];
        	DocumentFactory.all( function(res){
        		vm.documents = res.data;
        	});
            vm.deleteDoc = deleteDoc;
            function deleteDoc(id,index){
                DocumentFactory.deleteDoc(id, function(res){
                    vm.documents.splice( index, 1);
                });
            }
        }

})()