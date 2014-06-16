'use strict';

angular.module('cougarApp')
  .controller('PortfoliodetailsCtrl', function ($scope, Portfolio, $stateParams) {
    $scope.portfolio = Portfolio.get({ Uid: $stateParams.Uid }, function(portfolio){
      console.debug(portfolio);
      portfolio.PictureUrl = portfolio.getPictureUrl();
    });

    $('#menu').click(function(e){
        e.preventDefault();
        e.stopPropagation();

        $(this).siblings('nav').toggleClass('open');
    });
    $('.hamburger a').click(function(){
        $(this).parent('nav').removeClass('open');
    });
  });
