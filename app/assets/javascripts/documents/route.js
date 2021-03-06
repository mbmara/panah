(function(){
  angular
    .module('PANAH-APP')
    .config(['$stateProvider',applicationRoutes])
    .filter('sanitize_html', ['$sce', function($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        };
    }]);

    function applicationRoutes( $stateProvider ){
      $stateProvider
        .state('document',{
            url:'/documents',
            templateUrl:'documents/view.html'
        })
        .state('document.new',{
            url:'/new',
            controller:'newDocumentController',
            controllerAs:'newdoc',
            templateUrl:'documents/new/view.html'
        })
        .state('document.show',{
            url:'/show/:id',
            controller:'showDocumentController',
            controllerAs:'showdoc',
            templateUrl:'documents/show/view.html'
        })
        .state('document.edit',{
            url:'/edit/:id',
            controller:'editDocumentController',
            controllerAs:'editdoc',
            templateUrl:'documents/edit/view.html'
        })
        .state('document.pending',{
            url:'/pending',
            controller:'pendingDocumentController',
            controllerAs:'pendingDoc',
            templateUrl:'documents/pending/view.html'
        })
        .state('document.rejected',{
            url:'/rejected',
            controller:'rejectedDocumentController',
            controllerAs:'rejectDoc',
            templateUrl:'documents/rejected/view.html'
        })
    }
})()
