'use strict';

angular.module('cougarApp')
  .directive('dragAndDrop', function (File, $filter) {
    return {
      templateUrl: '/views/directives/dragAndDrop.html',
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        if(!scope.file)
            scope.file = new File;

        var handleFile = function(e){
            e.stopPropagation();
            e.preventDefault();

            console.log
            var dt = e.originalEvent.dataTransfer || e.originalEvent.srcElement;
            var files = dt.files;

            console.log(files);
            scope.file.Name = files[0].name;
            scope.file.Size = $filter('bytes')(files[0].size, 1);
            scope.file.Modified = moment(files[0].lastModifiedDate).format('L');
            scope.file.Type = files[0].type;
            scope.file.ModifiedBy = scope.user.FullName;

            scope.$apply();
        };

        var fileInput = element.find('input[type="file"]');
        scope.openFile = function(){
            console.log(fileInput);
            fileInput.click();
            return false;
        };
        fileInput.on('change', function(e){
            handleFile(e);
        });

        element.on('dragenter', function(e){
            console.debug('dragenter');
            e.stopPropagation();
            e.preventDefault();
        });
        element.on('dragover', function(e){
            console.debug('dragover');
            e.stopPropagation();
            e.preventDefault();
            element.addClass('dragover');
        });
        element.on('dragleave', function(e){
            e.stopPropagation();
            e.preventDefault();
            element.removeClass('dragover');
        });
        element.on('drop', function(e){
            handleFile(e);
        });
      }
    };
  }).filter('bytes', function() {
    return function(bytes, precision) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;
        var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
    };
  });
