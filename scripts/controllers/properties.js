'use strict';

angular.module('cougarApp')
  .controller('PropertiesCtrl', function ($scope, Property, Portfolio, Lease, $cookieStore, $modal, $state, $stateParams, $http, $sce, $filter, $window) {
    $scope.search = {};

    // Pagination
    $scope.perPage = 15;
    $scope.curPage = 0;
    $scope.jumpTop = function(){
      $('body').animate({ scrollTop: 0 });
    };
    if($state.current.name == 'portfolio.properties'){
      $scope.portfolio = Portfolio.get({ Uid: $stateParams.Uid }, function(portfolio){
        var properties = portfolio.Properties;
        /*_.each(properties, function(p) {
          p.workflow_statuses = Property.prototype.workflow_status()[0];
          p.PictureUrl = Property.prototype.getPictureUrl.call(p);
          Property.get({ Id: p.Id }, function(property){
            _.defaults(p, property);
          });
        });*/
        $scope.tags = [];

        _.each(properties, function(p) {
          p.PictureUrl = Property.prototype.getPictureUrl.call(p);
        });

        $scope.properties = properties;
        $scope.properties.$resolved = true;

        $http({method: 'GET', url: '/tableau.php?view=views/ExpiringLease/ExpiringLeases&PortfolioUID='+$filter('dashUid')($scope.portfolio.Uid) }).success(function(data){
          $scope.tableau_url = data;
        });
      });
    } else {
      $scope.properties = Property.query({ embed: 'models' }, function(properties){
        console.debug(properties);
        _.each(properties, function(p) {
          //p.workflow_statuses = p.workflow_status()[0];
          p.PictureUrl = p.getPictureUrl();
        });
        $scope.tags = [];
      });
    }

    $scope.numPages = function(){
      if($scope.properties && $scope.properties.$resolved)
        return Math.ceil( $filter('filter')($scope.properties, $scope.search).length / $scope.perPage);
      return 0;
    };

    $scope.Property = Property;

    $scope.portfolios = Portfolio.query();

    $scope.sort = {
      name: 'Id',
      dir: '+'
    };

    $scope.$sce = $sce;

    $scope.openNewPropertyModal = function(){
      var modal = $modal.open({
        templateUrl: '/views/modals/newPropertyModal.html',
        controller: 'newPropertyModal',
        scope: $scope
      });
      modal.result.then(function (property){
        property.$save(function(data){
          console.log(data);
          $state.go('property.edit', { Uid: data.Data.Uid });
        });
      });
    };

    $scope.openPortfolioModal = function(){
      var modal = $modal.open({
        templateUrl: '/views/modals/portfolioModal.html',
        controller: 'portfolioModal',
        scope: $scope
      });
      modal.result.then(function (result){
        var selected_properties = result[0],
            portfolio_props = result[1];
        console.log(portfolio_props);
        //_.each(selected_properties, function(p){
        //  p.PortfolioIds = p.PortfolioIds.concat(portfolio_props.portfolio_uids);
        //  p.$update();
        //});
        console.log(selected_properties);
      });
    };

    $scope.openAssignModal = function(){
      var modal = $modal.open({
        templateUrl: '/views/modals/assignPropertiesModal.html',
        controller: 'assignPropertiesModal',
        scope: $scope
      });
      modal.result.then(function (){
        console.log('Assigning properties...');
      });
    };
  })
  .filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if(input)
          return input.slice(start);
    };
  })
  .controller('newPropertyModal', function ($scope, $modalInstance, Property) {
    $scope.property = new Property;
    if($scope.portfolio)
      $scope.property.portfolio_ids = [$scope.portfolio.Id];
    $scope.ok = function () {
      $modalInstance.close($scope.property);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('portfolioModal', function ($scope, $modalInstance, $http) {
    $scope.portfolio_props = {
      portfolio_uids: []
    };
    $scope.portfolioSelect = {
      'multiple': true,
      'placeholder': 'Choose Portfolios'
    };
    $scope.selected_properties = _.filter($scope.properties, function(p){ return p.hasOwnProperty('checked') && p.checked; });
    $scope.ok = function () {
      console.log($scope.portfolio_props);

      $http.put('/services/portfolios/'+$scope.portfolio_props.portfolio_uids+'/properties', {
        propertyList: _.map($scope.selected_properties, function(p){ return p.Uid; })
      }).success(function(data){
        console.log(data);
      });

      $modalInstance.close([$scope.selected_properties, $scope.portfolio_props]);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('assignPropertiesModal', function ($scope, $modalInstance, Portfolio, Task, $state) {
    $scope.task = new Task();
    $scope.selected_properties = _.filter($scope.properties, function(p){ return p.hasOwnProperty('checked') && p.checked; });
    $scope.selected_portfolio = undefined;
    $scope.ok = function () {
      $scope.task.ObjectUIDs = _.map($scope.selected_properties, function(p) { return p.Uid; });
      $scope.task.Tasks = [];
      if($scope.task.isBudget)
        $scope.task.Tasks.push('Budget');
      if($scope.task.isValuation)
        $scope.task.Tasks.push('Valuation');
      console.log($scope.task);
      $scope.task.$save(function(task){
        console.log(task);
        $state.go('portfolio.edit', { Uid: task.Data.NewPortfolioUID });
      });
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
