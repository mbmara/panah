(function(){
    "use strict";

    angular.module("PANAH-APP")
        .controller("newDocumentController",newDocumentController);
        newDocumentController.$inject=['DocumentFactory','Server','$state','UserFactory'];

        function newDocumentController(DocumentFactory,Server, $state,UserFactory){
            var newdoc = this;

            newdoc.processing = false;
            newdoc.decisions = [
                {value:'decision', label:'Decision'},
                {value:'opinion', label:'Opinion'}
            ];
            newdoc.tinymceOptions = {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            };
            UserFactory.authenticate().then( function(res){
                newdoc.admin = res.data.admin;

                if(res.data.permission==1){
                    $state.go("main");
                    console.log(res);
                }
            })
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
                tags:[],
                links:[]
            }
            newdoc.removeLink = function(index){
                newdoc.data.links.splice(index,1);
            }
            newdoc.addLink = function(link){
                newdoc.data.links.push(link);
                newdoc.temp={};
            }
            newdoc.removeFile = function( index ){
                newdoc.flowdata.files.splice(index,1);
            }
            newdoc.removeTag = function(index){
                newdoc.data.tags.splice(index,1);
            }

            newdoc.total_upload = 0;
            function getProgress(file){
                newdoc.total_size=0;

               
                angular.forEach(file, function(data){

                    newdoc.total_size+=data.size;
                    newdoc.total_upload+= data._prevUploadedSize;

                })
                var progress = newdoc.total_upload / newdoc.total_size * 100 || 0;
                newdoc.total_upload = Math.round(progress);
                
            }
            newdoc.file_content=[];
            newdoc.progress = function(file  , flow){
                getProgress(flow.files);
            }
            newdoc.addtag = function(tag){
                newdoc.data.tags.push(tag);
                newdoc.tag="";  
            }
            newdoc.uploadComplete = function(){
                newdoc.processing = false;
                $state.go("document");
            }
            newdoc.added = function(file  , event,flow){
                newdoc.file_content = flow.files;
            }
            newdoc.submit = function(){
                newdoc.processing = true;
                DocumentFactory.create(newdoc.data, function(res){
                    newdoc.flowdata.opts.target ="/api/v1/post/upload/";
                    newdoc.flowdata.opts.query.post_id = res.data.payload;
                    newdoc.flowdata.opts.headers ={Authorization :Server.token()}
                    newdoc.flowdata.upload()  
                });
                
            }

        }

})()