'use strict';

angular.module('cougarApp')
  .factory('Workflow', function ($resource) {
    var Workflow = $resource('services/models/?filter=tasks', {}, {
      'query': {
        method: 'GET',
        transformResponse: function(data){ return angular.fromJson(data).Models; },
        isArray: true
      }
    });
    return Workflow;
  });
