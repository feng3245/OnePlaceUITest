'use strict';

angular.module('cougarApp')
  .controller('LoansCtrl', function ($scope, Loan, $cookieStore, $stateParams) {
    $scope.loans = Loan.query();

    $scope.layout = $cookieStore.get('cgLayout_loans') || 'Table';
    $scope.$watch('layout', function(){
      $cookieStore.put('cgLayout_loans', $scope.layout);
    });

    $scope.clear = function(){
      $scope.search = {};
    };

  });
