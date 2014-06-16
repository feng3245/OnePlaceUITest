'use strict';

angular.module('cougarApp')
  .controller('LoginCtrl', function ($scope, $cookieStore, $http, $state, $rootScope) {
    var savedState = $rootScope.savedState;
    $scope.loginData = {};

    $scope.login = function($event){
        console.log('Logging in...');
        if($cookieStore.get('User')){
            $http.defaults.headers.common['Authorization'] = $cookieStore.get('User')['AccessToken'];
        }
                        console.log($rootScope.savedState);

        if($event)
          $($event.currentTarget).attr('disabled', 'disabled');
        $http.post('services/auth/credentials', $scope.loginData)
            .success(function (data) {
              console.log(data);
              $http.defaults.headers.common['Authorization'] = data['AccessToken'];
              $cookieStore.put('User', data);
              $rootScope.user = data;
              $rootScope.getSystem();
              if(savedState && savedState.name != 'login'){
                $rootScope.savedState = undefined;
                $state.go(savedState.name, savedState.params);
              } else {
                $state.go('properties');
              }
            })
            .error(function (data){
                console.log(data);
                $scope.badLogin = (data.ResponseStatus && data.ResponseStatus.Message) || 'Invalid Username or Password.';
                $($event.currentTarget).removeAttr('disabled');
            });
    };

  });
