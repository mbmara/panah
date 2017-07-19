(function(){
    "use strict";

    angular.module("PANAH-APP")
        .controller("newDocumentController",newDocumentController);
        newDocumentController.$inject=['DocumentFactory'];

        function newDocumentController(DocumentFactory){
            var newdoc = this;

            newdoc.decisions = [
                {value:'decision', label:'Decision'},
                {value:'opinion', label:'Opinion'}
            ];
            newdoc.tinymceOptions = {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            };

            newdoc.flowdata = {};
            newdoc.data = {
                 
            }
            newdoc.submit = function(){
                // DocumentFactory.create(newdoc.data, function(res){
                //     console.log(res);
                // });
                newdoc.flowdata.opts.target ="/api/v1/post/upload/";
                // newdoc.flowdata.opts.singleFile = true;
                console.log('wrking');
                newdoc.flowdata.upload()  
            }

        }

})()