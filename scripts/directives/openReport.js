'use strict';

angular.module('cougarApp')
  .directive('openReport', function ($window) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|iOS)/);

            var href = isMobile && !scope.report.Tableau ? (scope.report.URL+'&rc:Stylesheet=Cougar&rs:Command=Render').replace('ecancelliere:3M@g1n5!@', '') : element.attr('href');

            $window.open(href, '_blank', isMobile ? '' : 'width=1024,height='+( element.attr('href').indexOf('(TB)') > -1 ? 536 : 900 ));
        });
      }
    };
  });
