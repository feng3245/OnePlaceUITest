'use strict';

angular.module('cougarApp')
  .factory('File', function ($resource) {
    var File = $resource('/views/services/files.html.json');

    return File;
  });
