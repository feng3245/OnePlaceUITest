'use strict';

angular.module('cougarApp')
  .directive('imageUploader', function ($http, $upload, $rootScope) {
    return {
      templateUrl: '/views/directives/imageUploader.html',
      restrict: 'AC',
      scope: {
        entity: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.entityType = scope.entity.__type.split(',')[0].split('.');
        scope.entityType = scope.entityType[scope.entityType.length-1];
        scope.onFileSelect = function($files) {
          //$files: an array of files selected, each file has name, size, and type.
          for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            scope.upload = $upload.upload({
              url: 'services/upload/Image?ParentId='+scope.entity.Uid+'&ParentType='+scope.entityType, //upload.php script, node.js route, or servlet url
              file: file
            }).progress(function(evt) {
              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
              console.log(data);
            });
          }
        };

        var fileInput = element.find('input[type="file"]');
        scope.openFile = function(){
            console.log(fileInput);
            fileInput.click();
            return false;
        };

/*
        element.find('input[type="file"').on('change', function(e){

          console.log(e);
          var dt = e.originalEvent.dataTransfer || e.originalEvent.srcElement;
          var file = dt.files[0];

          console.log(dt);
          console.log(file);

          var reader = new FileReader();

          reader.onload = function(e){
            console.log(reader.result);
            $http.post('services/upload/Image?ParentId='+scope.entity.Uid+'&ParentType='+scope.entityType, reader.result)
               .success(function(data){
                  console.log(data);
               });
             };

          var fileData = reader.readAsDataURL(file);
        });
*/
      }
    };
  });
