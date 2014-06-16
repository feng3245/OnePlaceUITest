'use strict';

angular.module('cougarApp')
  .directive('hamburgerNav', function ($document, $compile) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var $navs = element.find('.hamburger-nav');
        var menu = element.find('.open-menu').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).parent('nav').siblings('nav'+$(this).attr('href')).toggleClass('open');

            $document.off('click.hamburger-nav').on('click.hamburger-nav', function(e){
              var $hamnav = $(e.target).closest('.hamburger-nav');
              if(!$hamnav.length){
                $navs.removeClass('open');
                $document.off('click.hamburger-nav');
              }
            });
        });

        element.find('.hamburger-nav a').click(function(e){
            console.log($(this).attr('href'));
            if($(this).attr('href') == '#'){
                e.preventDefault();
                e.stopPropagation();
            }
            $navs.removeClass('open');
        })

        .children('span').click(function(e){
          e.preventDefault();
          e.stopPropagation();
          if($(this).hasClass('pinned')){
            $(this).removeClass('pinned');
            menu.parent().find( '.'+$(this).parent().attr('class').replace(' ', '.') ).remove();
          } else {
            $(this).addClass('pinned');
            menu.parent().append( $compile($(this).parent().clone().html('').attr('tooltip', $(this).parent().text()))(scope) );
          }
        });

      }
    };
  });
