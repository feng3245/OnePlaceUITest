'use strict';

angular.module('cougarApp')
  .factory('Lease', function ($resource) {
    var Lease = $resource('services/leases/:Uid', {}, {
      'query': {
        method: 'GET',
        transformResponse: function(data){ return angular.fromJson(data).Data; },
        isArray: true
      }
    });
    /*var Lease = $resource('/views/services/leases.html.json', {}, {
      'query': {
        method: 'GET',
        transformResponse: function(data){
          console.log(data);
          var leases = angular.fromJson(data);
          _.each(leases, function(l){
            l.StartDate = moment(l.StartDate);
            l.EndDate = moment(l.EndDate);
          });
          return _.sortBy(leases, 'StartDate');
        },
        isArray: true
      }
    });*/

    Lease.years = function(leases){
      var years = _.flatten(_.map(leases, function(lease){
        return [moment(lease.StartDate).year(), moment(lease.EndDate).year()];
      }));
      var min = _.min(years),
          max = _.max(years);
      var range = _.range(min, max);
                  range.push(max);
      return range;
    };

    Lease.grouped = function(leases){
      return _.groupBy(leases, 'UnitUID');
    };

    Lease.prototype.width = function(years){
      var diff = moment(this.EndDate).endOf('month').diff( moment(this.StartDate).startOf('month'), 'months') + 1;
      return (diff / (years.length*12) ) * 100;
    };

    Lease.prototype.left = function(years){
      var diff = moment(this.StartDate).startOf('month').diff( moment().year(years[0]).startOf('month'), 'months');
      return ( diff / (years.length*12) ) * 100;
    };

    return Lease;
  });
