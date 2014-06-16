'use strict';

angular.module('cougarApp')
  .controller('ReportsCtrl', function ($scope, Report, $stateParams, $cookieStore, $modal, $http, $filter, $sce) {
    $scope.$sce = $sce;
    $http({method: 'GET', url: '/tableau.php?view=views/StackingPlanChart/StackingPlanChart&EntityUID='+$filter('dashUid')($stateParams.Uid) }).success(function(data){
      $scope.stacking_url = data;
    });
    $scope.reports = Report.query(function(reports){
        console.debug(reports);
        $scope.tags = _.uniq(_.flatten(_.map(reports, function(r){
          return r.Tags;
        })));
    });
    $http({method: 'GET', url: '/tableau.php?view=views/Reports/LeaseMaster&EntityUID='+$filter('dashUid')($stateParams.Uid) }).success(function(data){
      $scope.rentroll_url = data;
    });

    $scope.select2Options = {
      'multiple': true,
      'simple_tags': true,
      'placeholder': 'Tags',
      'tokenSeparators': [',', ' '],
      'tags': []
    };

    $scope.sort = {
      name: 'Id',
      dir: '+'
    };

    $scope.clear = function(){
      $scope.search = {};
    };

    $scope.openNewReportModal = function(report){
      var options = {
        templateUrl: '/views/modals/newReportModal.html',
        controller: 'newReportModal',
        scope: $scope
      }
        options.resolve = {
          report: function () {
            return report ? report : false;
          }
        }
      var modal = $modal.open(options);
      modal.result.then(function (report){
        $scope.reports.push(report);
      });
    };
  })
  .controller('newReportModal', function ($scope, Report, $modalInstance, report) {
    if(report){
      $scope.report = report;
    } else {
      $scope.report = new Report;
    }

    $scope.ok = function () {
      $scope.report.Id = 999;
      $modalInstance.close($scope.report);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
