'use strict';

angular.module('cougarApp')
  .filter('uniqProp', function () {
    return function (input, prop) {
      return _.uniq(_.compact(_.pluck(input, prop)));
    };
  });