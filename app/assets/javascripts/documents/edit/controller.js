(function(){
    "use strict";

    angular.module("PANAH-APP")
        .controller("editDocumentController",editDocumentController);
        editDocumentController.$inject=['DocumentFactory','$state'];

        function editDocumentController(DocumentFactory, $state){
            var editdoc = this;

            var id = $state.params.id;
            editdoc.decisions = [
                {value:'decision', label:'Decision'},
                {value:'opinion', label:'Opinion'}
            ];

            editdoc.removeLink = function(index){
                window.event.stopPropagation();
            }
            editdoc.tinymceOptions = {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            };
            DocumentFactory.edit( id , function(res){
            	editdoc.data = res.data.payload.document;
				editdoc.data.parties = JSON.parse(res.data.payload.document.parties);
                editdoc.data.tags = JSON.parse(res.data.payload.document.tags);
				editdoc.data.links = JSON.parse(res.data.payload.document.links);
                editdoc.data.attachments = res.data.payload.attachments;
            });
            
            editdoc.update = function(){
            	DocumentFactory.update( editdoc.data.id,editdoc.data, function(res){
            		console.log(res);
            	});
            }
        }

})()