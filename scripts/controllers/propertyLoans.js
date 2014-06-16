'use strict';

angular.module('cougarApp')
  .controller('PropertyLoansCtrl', function ($scope, $anchorScroll, $location) {
    $scope.clear = function(){
      $scope.search = {};
    };
  });
