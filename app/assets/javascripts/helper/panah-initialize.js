// register new component dashboard filter
(function(){
  angular
    .module('PANAH-APP')
    .directive('panahInitialize',['UserFactory',function(UserFactory){
    	return {
	      	restrict: 'AE',
	      	replace: 'false',
	      	link: function(scope, elem, attrs) {
	      		UserFactory.authenticate().then( 

		      		function(res){
		      			if(res.data.status){
		      				UserFactory.name = res.data.name;
		      				UserFactory.user_id = res.data.id;
			      			if(attrs.panahInitialize=="secure"){
			      				elem.css({display:'block'});
				      		}
				      		if(attrs.panahInitialize=="login"){
			      				elem.remove();
				      		}
		      			}else{
		      				if(attrs.panahInitialize=="secure"){
		      					elem.remove();
				      		}
				      		if(attrs.panahInitialize=="login"){
			      				elem.css({display:'block'});
				      		}
		      			}
		      			
			      		
		      		},
		      		function(){
		      			if(attrs.panahInitialize=="secure"){
		      				elem.remove();
			      		}
			      		if(attrs.panahInitialize=="login"){
		      				elem.css({display:'block'});
			      		}
		      		}
	      		)
	      		
    	  	}
	  	};
    }])
})()
