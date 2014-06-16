'use strict';

angular.module('cougarApp')
  .directive('tagging', function ($document) {
    return {
      templateUrl: '/views/directives/tagging.html',
      restrict: 'C',
      scope: {
        resource: '=',
        tags: '='
      },
      controller: function($scope){
        console.log($scope.resource);
        $scope.select2Options = {
          'multiple': true,
          'simple_tags': true,
          'placeholder': 'Tags',
          'tokenSeparators': [',', ' '],
          'tags': $scope.tags
        };
        $scope.isOpen = false;
        $scope.toggleTagging = function($event){
          var tagger = $($event.currentTarget).closest('article').children('.tagging');
          tagger.toggleClass('open');
        };
      },
      link: function postLink(scope, element, attrs) {
          scope.$watch('isOpen', function(){
            element.toggleClass('open', scope.isOpen);
          });
          $document.off('click.tagging').on('click.tagging', function(e){
            if( !$(e.target).closest('.tagging').length && !$(e.target).closest('[tagging-toggle]').length ) {
               $('.tagging').removeClass('open');
            }
          });
      }
    };
  })
  .directive('taggingToggle', function(){
    return {
        restrict: 'A',
        link: function postLink(scope, element){
            element.bind('click', function(e){
              var tagger = $(e.currentTarget).closest('article').children('.tagging');
              tagger.toggleClass('open');
            });
        }
    };
  });
