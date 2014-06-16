'use strict';

angular.module('cougarApp')
  .controller('WorkflowsCtrl', function ($scope, Workflow, Property) {
    $scope.workflows = Workflow.query(function(workflows){
      console.debug(workflows);
    });
    $scope.moment = moment;
    $scope.search = {};
    $scope.sort = {
      name: 'Id',
      dir: '+'
    };
  });
