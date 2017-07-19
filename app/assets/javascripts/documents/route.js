(function(){
  angular
    .module('PANAH-APP')
    .config(['$stateProvider',applicationRoutes]);

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
    }
})()
