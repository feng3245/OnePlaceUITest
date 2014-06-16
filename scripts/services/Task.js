'use strict';

angular.module('cougarApp')
  .factory('Task', function ($resource) {
      var Task = $resource('services/tasks');

      return Task;
    });
