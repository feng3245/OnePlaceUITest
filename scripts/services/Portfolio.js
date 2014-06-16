'use strict';

angular.module('cougarApp')
  .factory('Portfolio', function ($resource, $rootScope, cougarConfig) {
    var Portfolio = $resource('services/portfolios/:Uid', { currmodel: $rootScope.activeModel.Code }, {
      'query': {
        method: 'GET',
        transformResponse: function(data){ return _.filter(angular.fromJson(data).Data, function(p) { return p.Name; }); },
        isArray: true
      },
      'get': {
        method: 'GET',
        transformResponse: function(data){ return angular.fromJson(data).Data; },
        isArray: false
      },
      'update': {
        method: 'PUT',
        transformResponse: function(data){ return angular.fromJson(data).Data; }
      },
      'save': {
        method: 'POST',
        transformResponse: function(data){ return angular.fromJson(data).Data; }
      }
    });

    Portfolio.prototype.getPictureUrl = function(){
      return $rootScope.isDemo ? Portfolio.prototype.randomPictureUrl.call(this) : Portfolio.prototype.defaultPictureUrl.call(this);
    };

    Portfolio.prototype.randomPictureUrl = function(){
      return '/styles/images/stock/'+_.random(1, 7)+'.jpg';
    };

    Portfolio.prototype.defaultPictureUrl = function(){
      return '/styles/images/placeholder.png';
    };

    return Portfolio;
  });
