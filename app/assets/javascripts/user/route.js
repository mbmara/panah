(function(){
  angular
    .module('PANAH-APP')
    .config(['$stateProvider',applicationRoutes]);

    function applicationRoutes( $stateProvider ){
      $stateProvider
        .state('user',{
            url:'/user',
            templateUrl:'user/view.html'
        })
        .state('user.new',{
            url:'/new',
            templateUrl:'user/new/view.html',
            controller:'userCreateController',
            controllerAs:'newuser'
        })
        .state('user.profile',{
            url:'/profile/:id',
            templateUrl:'user/profile/view.html',
            controller:'userProfileController',
            controllerAs:'profile'
        })
    }
})()
