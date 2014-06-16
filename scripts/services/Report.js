'use strict';

angular.module('cougarApp')
  .factory('Report', function ($resource) {
    /* var Report = $resource('services/reports/:id', {}, {
      'query': {
        method: 'GET',
        transformResponse: function(data){ return _.filter(angular.fromJson(data).Data, function(r){ return r.URL; }); },
        isArray: true
      },
      'get': {
        method: 'GET',
        transformResponse: function(data){ return angular.fromJson(data).Data; },
        isArray: false
      },
      'update': {
        method: 'PUT'
      }
    }); */
    var Report = $resource('/views/services/reports.html.json');

    Report.prototype.duplicate = function(){
      var report = angular.copy(this);
      report.Id = null;
      return report.$save();
    };

    return Report;
  });
