(function(){
    "use strict";

    angular.module("PANAH-APP")
        .controller("editDocumentController",editDocumentController);
        editDocumentController.$inject=['DocumentFactory','$state','Server','UserFactory'];

        function editDocumentController(DocumentFactory, $state, Server,UserFactory){
            var editdoc = this;
            UserFactory.authenticate().then( function(res){
                editdoc.admin = res.data.admin;

                if(res.data.permission==1){
                    $state.go("main");
                    console.log(res);
                }
            })
            var id = $state.params.id;
            editdoc.decisions = [
                {value:'decision', label:'Decision'},
                {value:'opinion', label:'Opinion'}
            ];
            editdoc.reasign= function(){
                UserFactory.getUser(function(res){
                    editdoc.userlist = res.data;
                    $('#docsReassign').modal('show');
                })
            }
            editdoc.submit = function(){
                $('#docsReassign').modal('hide');
                DocumentFactory.reasign(editdoc.data,function(res){
                    alert(res.data.payload);
                    $state.go('document');
                });
            }
            editdoc.data = {};
             DocumentFactory.destroy_cache();
            editdoc.approve = function(){
                if(editdoc.data.tags.length==0){
                    alert("Please add tags and save changes");
                }else{
                    DocumentFactory.approve(id,  function(res){
                        alert(res.data.payload);
                        $state.go('document')
                        
                    });
                }
            }
            editdoc.reject = function(){
                
                DocumentFactory.reject(id,  function(res){
                    alert(res.data.payload);
                    $state.go('document')
                });
                
            }
            editdoc.addtag = function(tag){
                editdoc.data.tags.push(tag);
            }
            editdoc.removeLink = function(index){
                editdoc.data.links.splice(index,1);
            }
            editdoc.addLink = function(link){
                editdoc.data.links.push(link);
                editdoc.temp={};
            }
            editdoc.removeFile = function( index ){
                editdoc.data.attachments.splice(index,1);
            }
            editdoc.removeFlowFile = function(index){
                editdoc.file_content.splice( index, 1);
            }
            editdoc.removeTag = function(index){
                editdoc.data.tags.splice(index,1);
            }
            editdoc.tinymceOptions = {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            };
            DocumentFactory.edit( id , function(res){
            	editdoc.data = res.data.payload.document;
				editdoc.data.parties = JSON.parse(res.data.payload.document.parties) || [];
                editdoc.data.tags = JSON.parse(res.data.payload.document.tags) || [];
				editdoc.data.links = JSON.parse(res.data.payload.document.links) || [];
                editdoc.data.attachments = res.data.payload.attachments;
            });
            editdoc.flowdata = {};
            editdoc.total_upload = 0;
            function getProgress(file){
                editdoc.total_size=0;

               
                angular.forEach(file, function(data){

                    editdoc.total_size+=data.size;
                    editdoc.total_upload+= data._prevUploadedSize;

                })
                var progress = editdoc.total_upload / editdoc.total_size * 100 || 0;
                editdoc.total_upload = Math.round(progress);
                
            }
            editdoc.progress = function(file  , flow){
                //console.log(flow.files[0]._prevUploadedSize);
                getProgress(flow.files);
            }
            editdoc.uploadComplete = function(){
                editdoc.processing = false;
                $state.go("document");
            }
            editdoc.added = function(file  , event,flow){
                editdoc.file_content = flow.files;
            }
            editdoc.update = function(){
                editdoc.processing = true;
            	DocumentFactory.update( editdoc.data.id,editdoc.data, function(res){
                    editdoc.flowdata.opts.target ="/api/v1/post/upload/";
                    editdoc.flowdata.opts.query.post_id = res.data.payload;
                    editdoc.flowdata.opts.headers ={Authorization :Server.token()}
                    editdoc.flowdata.upload()  
            	});
            }
        }

})()