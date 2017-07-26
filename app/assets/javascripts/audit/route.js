(function(){
  angular
    .module('PANAH-APP')
    .config(['$stateProvider',applicationRoutes]);

    function applicationRoutes( $stateProvider ){
      $stateProvider
        .state('audit',{
            url:'/audit',
            templateUrl:'audit/view.html'
        })
        .state('audit.login',{
            url:'/login',
            controller:'loginAuditController',
            controllerAs:'loginAudit',
            templateUrl:'audit/login/view.html'
        })
        
    }
})()
