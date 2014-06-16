'use strict';

angular.module('cougarApp')
  .controller('WorkflowCtrl', function ($scope, KPI, Model, $state) {
    $scope.kpis = KPI.kpis();
    $scope.models = Model.models();
    $scope.models.shift();

    $scope.steps = [
      'Submit',
      'First Review',
      'Executive Approval'
    ];

    $scope.history = [
      {
        Date: Faker.Date.recent(2),
        Action: 'Started',
        Name: 'Christine Deng',
        Comment: ''
      }
    ];

    $scope.step = 0;

    $scope.rejected = [];

    $scope.nextStep = function(comment, approval){
      if(approval == 'Approve' || approval == 'Reject' || $scope.step == 0){
        $scope.history.push({
          Date: new Date(),
          Action: $scope.steps[$scope.step],
          Name: $scope.user.FullName,
          Comment: comment
        });
        console.log(approval);
        if(approval == 'Reject')
          $scope.rejected.push($scope.step);
        console.log($scope.rejected);
        $scope.step++;
        if($scope.step > 2){
          $state.go('property.models', { Uid: $scope.property.Uid });
        }
      }
    };

    $scope.backStep = function(){
      if($scope.step > 0)
        $scope.step--;
    };

    $scope.goToStep = function(step){
      $scope.step = step;
    };
  });
