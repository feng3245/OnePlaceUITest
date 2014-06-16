'use strict';

angular.module('cougarApp')
  .directive('cgTable', function () {
    return {
      restrict: 'A',
      scope: false,
      link: function postLink(scope, element) {
        if(_.isUndefined(scope.sort)){
          scope.sort = {
            name: 'Id',
            dir: '+'
          };
        }
        element.find('th').bind('click', function(e){
          var name = $(e.currentTarget).attr('sort-by') || $(e.currentTarget).text().replace(' ', ''),
              dir  = '+';

          if(scope.sort.name == name)
            dir = scope.sort.dir == '+' ? '-' : '+';

          $(e.currentTarget).removeClass('asc desc').addClass( dir == '+' ? 'asc' : 'desc' ).siblings().removeClass('asc desc');

          scope.sort = {
            name: name,
            dir: dir
          };
          scope.$apply();
        });
      }
    };
  });
