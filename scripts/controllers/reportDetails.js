'use strict';

angular.module('cougarApp')
  .controller('ReportDetailsCtrl', function ($scope, Report, $stateParams, $window, $sce) {
    /*$scope.report = Report.get({ id: $stateParams.name }, function(report){
        console.debug(report);
    });*/
    $scope.reports = Report.query(function(reports){
      $scope.report = _.findWhere(reports, {Name: $stateParams.name});
    });
    $scope.close = function(){
        $window.close();
    };
    $scope.$sce = $sce;
  });
