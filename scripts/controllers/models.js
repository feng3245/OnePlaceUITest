'use strict';

angular.module('cougarApp')
  .controller('ModelsCtrl', function ($scope, KPI, Model) {
    $scope.sort = {
      name: 'Id',
      dir: '+'
    };

    $scope.property.$promise.then(function(){
      $scope.models = $scope.property.Models;
      var system = $scope.system.Models;
      console.log(system);
      var codes = _.map($scope.models, function(m) { return m.Code });
      console.log(codes);
      $scope.models = $scope.models.concat( _.filter(system, function(m){ m.isFake = true; return codes.indexOf(m.Code) === -1; }) );
      console.log($scope.models);
      $scope.kpiModel = $scope.models[0];
    });

    $scope.kpis = KPI.kpis();

    $scope.switchKPI = function(model){
        if($scope.kpiModel != model){
            $scope.kpiModel = model;
            $scope.kpis = KPI.kpis();
        }
    };
  });
