'use strict';

angular.module('cougarApp')
  .controller('PortfoliosCtrl', function ($scope, Portfolio, $modal, $cookieStore, $http, $sce, $state) {
    $scope.portfolios = Portfolio.query(function(portfolios){
        _.each($scope.portfolios, function(portfolio){
          Portfolio.get({ Uid: portfolio.Uid }, function(p){
            console.log(p);
            portfolio.Assets = p.Properties.length;
            portfolio.PictureUrl = portfolio.getPictureUrl();
          });
        });
    });

    $scope.sort = {
      name: 'Id',
      dir: '+'
    };
    $http({method: 'GET', url: '/tableau.php?view=views/TIAA-AssetManager/LeaseExpirybyRegion'}).success(function(data){
      $scope.tableau_url = data;
    });
    $scope.$sce = $sce;

    $scope.openNewPortfolioModal = function(){
      var modal = $modal.open({
        templateUrl: '/views/modals/newPortfolioModal.html',
        controller: 'newPortfolioModal'
      });
      modal.result.then(function (portfolio){
        portfolio.$save(function(p){
          p.PictureUrl = p.getPictureUrl();
          console.log(p);
          $scope.portfolios.unshift(p);
          $state.go('portfolio.edit', { Uid: p.Uid });
        });
      });
    };

    $scope.openAssignModal = function(){
      var modal = $modal.open({
        templateUrl: '/views/modals/assignPortfolioModal.html',
        controller: 'assignPortfolioModal',
        scope: $scope
      });
      modal.result.then(function (){
        console.log('Assigning portfolios...');
      });
    };
  })
  .controller('newPortfolioModal', function ($scope, $modalInstance, Portfolio) {
    $scope.portfolio = new Portfolio;
    $scope.ok = function () {
      $modalInstance.close($scope.portfolio);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('assignPortfolioModal', function ($scope, $modalInstance, Portfolio, Task, $state) {
    $scope.task = new Task();
    $scope.selected_portfolios = _.filter($scope.portfolios, function(p){ return p.hasOwnProperty('checked') && p.checked; });
    $scope.ok = function () {
      $scope.task.ObjectUIDs = _.map($scope.selected_portfolios, function(p) { return p.Uid; });
      $scope.task.Tasks = [];
      if($scope.task.isBudget)
        $scope.task.Tasks.push('Budget');
      if($scope.task.isValuation)
        $scope.task.Tasks.push('Valuation');
      $scope.task.ObjectType = 'Portfolio';
      console.log($scope.task);
      $scope.task.$save(function(task){
        console.log(task);
      });
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });