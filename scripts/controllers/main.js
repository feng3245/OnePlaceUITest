'use strict';

angular.module('cougarApp')
  .controller('MainCtrl', function ($scope, $cookieStore, $http) {
    $scope.title = 'Cougar Budget';
  });
