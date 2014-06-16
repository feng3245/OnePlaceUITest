'use strict';

angular.module('cougarApp')
  .directive('checkAll', function () {
    return {
      restrict: 'A',
      scope: {
        models: '='
      },
      link: function postLink(scope, element, attrs) {
        console.log(scope.models);
        element.on('click', function(){
          _.each(scope.models, function(m){
            m.checked = element.is(':checked');
          });
          scope.$apply();
        });
      }
    };
  });
