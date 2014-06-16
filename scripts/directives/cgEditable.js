'use strict';

angular.module('cougarApp')
  .directive('cgEditable', function ($document) {
    return {
      templateUrl: '/views/directives/cgEditable.html',
      restrict: 'EC',
      scope: {
        field: '=',
        label: '@',
        button: '@',
        currency: '@'
      },
      link: function(scope, element, attrs){
        scope.textarea = attrs.hasOwnProperty('textarea');
        var $input = element.children('input[type="text"]');
        scope.isEditing = false;

        scope.showInput = function(){
          scope.individualEdit = true;
          scope.isEditing = true;
          _.defer(function(){ $input.focus(); });
        };
        scope.hideInput = function(){
          scope.individualEdit = false;
          scope.isEditing = false;
        };

        scope.saveEntity = function(){
          if(scope.$parent.property){
            scope.$parent.property.$update();
          }
        };

        var clickOff = function(e){
          if(!$(e.target).closest(element).length){
            scope.isEditing = false;
            scope.$apply();
          }
        };

        scope.$watch('isEditing', function(val){
          if(val){
            //$document.bind('click', clickOff);
          } else {
            //$document.unbind('click', clickOff);
          }
        });

        scope.$on('editAll', function(){
          scope.isEditing ? scope.isEditing = false : scope.isEditing = true;
        });
      }
    };
  });
