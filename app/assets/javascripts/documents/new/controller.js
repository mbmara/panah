(function(){
    "use strict";

    angular.module("PANAH-APP")
        .controller("newDocumentController",newDocumentController);
        newDocumentController.$inject=['DocumentFactory','Server'];

        function newDocumentController(DocumentFactory,Server){
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
                title:"Ramel Story",
                subject:"Subject ofo Ramel",
                abstract:"<p> <b>test </b>abstract </p>",
                body:"<p> <b>test </b>body </p>",
                author:'Author',
                case_number:'Case Number',
                parties:["party1","party2","Party3"],
                promulgation_date:"2017-07-15",
                decision:'opinion',
                tags:[]
            }
            newdoc.file_content=[];
            newdoc.progress = function(file  , flow){
                console.log(flow);
            }
            newdoc.addtag = function(tag){
                newdoc.data.tags.push(tag);
            }
            newdoc.added = function(file  , event,flow){
                newdoc.file_content = flow.files;
            }
            newdoc.submit = function(){
                DocumentFactory.create(newdoc.data, function(res){
                    newdoc.flowdata.opts.target ="/api/v1/post/upload/";
                    newdoc.flowdata.opts.query.post_id = res.data.payload;
                    newdoc.flowdata.opts.headers ={Authorization :Server.token()}
                    console.log(newdoc.flowdata.opts);
                    newdoc.flowdata.upload()  
                });
                
            }

        }

})()