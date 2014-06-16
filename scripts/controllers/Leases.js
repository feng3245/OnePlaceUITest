'use strict';

angular.module('cougarApp')
  .controller('LeasesCtrl', function ($scope, Lease, $cookieStore, $state) {
    $scope.Lease = Lease;

    if($state.current.name == 'property.leases'){
      $scope.leases = $scope.property.Leases;
          $scope.years = Lease.years($scope.leases);
          $scope.groupedLeases = _.groupBy($scope.leases, 'UnitUID');
    } else {
      $scope.leases = Lease.query(function(leases){
        console.debug(leases);
          $scope.years = Lease.years(leases);
          $scope.groupedLeases = _.groupBy(leases, 'UnitUID');
      });
    }
    $scope.layout = $cookieStore.get('cgLayout_leases') || 'Table';
    $scope.$watch('layout', function(){
      $cookieStore.put('cgLayout_leases', $scope.layout);
    });
    $scope.moment = moment;
  });
