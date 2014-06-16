'use strict';

angular.module('cougarApp')
  .directive('kpiChart', function () {
    return {
      templateUrl: '/views/directives/kpiChart.html',
      restrict: 'C',
      scope: {
        name: '@',
        kpis: '='
      }
    };
  });
