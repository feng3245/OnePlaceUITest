'use strict';

angular.module('cougarApp')
  .factory('cougarHttpInterceptor', function (cougarConfig, $rootScope, $q){
    return {
      request: function(config){
        if(config.url.indexOf('.html') === -1 && config.url.indexOf('.php') === -1){
          config.url = cougarConfig.API_HOST+config.url;
        }
        return config; // TODO: interceptor on promises?
      },
      responseError: function(response){
        if(response.status === 401 || response instanceof SyntaxError){
          console.log('401 from server');
          $rootScope.savedState = {
            name: $rootScope.$state.current.name,
            params: $rootScope.$state.params
          };
          $rootScope.logout();
          $rootScope.$state.go('login');
          return $q.reject(response);
        }
      }
    };
  });
