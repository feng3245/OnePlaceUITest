'use strict';

angular.module('cougarApp')
  .filter('dashUid', function () {
    return function (uid) {
      return uid.slice(0,8)+'-'+uid.slice(8,12)+'-'+uid.slice(12,16)+'-'+uid.slice(16,20)+'-'+uid.slice(20,32);
    };
  });
