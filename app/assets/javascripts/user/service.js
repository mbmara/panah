(function() {
    'use strict';

    angular
      .module('PANAH-APP')
      .factory('UserFactory', UserFactory );

      UserFactory.$inject = ['Server'];

      function UserFactory( Server ) {
        var f={};

        f.create = create;
        f.types = types;
        f.all = all;
        f.authenticate = authenticate;
        f.login = login;
        f.name = null;
        f.logout = logout;

        function logout(){
          Server.setToken(0);
          location.reload();
        }
        function authenticate(){
          return Server.post('user/authenticate');
        }
        function login(user,k){
          Server.post('user/login',{user:user}).then(k , function(res){
            alert("login failed");
          });
        }
        function all(k){
          Server.get('users').then(k, function(res){
            alert("failed to get user");
          });
        }
        function create(user,k){
          Server.post('user',{user:user}).then(k,function(){
            alert("Failed to save");
          });
        }

        function types( k ){
          Server.get('user/types').then( k, function(){
            alert("failed to get types");
          });
        }
        return f;
      }
})();
