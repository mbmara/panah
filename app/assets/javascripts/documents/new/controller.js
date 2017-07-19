(function(){
    "use strict";

    angular.module("PANAH-APP")
        .controller("newDocumentController",newDocumentController);
        newDocumentController.$inject=[];

        function newDocumentController(){
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
                newdoc.flowdata.opts.target ="/api/v1/post/upload/";
                newdoc.flowdata.opts.singleFile = true;
                console.log(newdoc.flowdata);
                newdoc.flowdata.upload()  
            }

        }

})()