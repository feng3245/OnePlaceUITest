'use strict';

angular.module('cougarApp')
  .controller('NotesCtrl', function ($scope, $modal) {

    var fakeNote = function(){
      return {
        Date: Faker.Date.recent(365),
        Subject: _.map(Faker.Lorem.words(2), function(l) { return _.str.capitalize(l) }).join(' '),
        Note: _.str.capitalize( Faker.Lorem.sentence() ),
        CreatedBy: Faker.Name.findName(),
        CreatedOn: Faker.Date.recent(365)
      };
    };

    $scope.notes = [
      fakeNote(),
      fakeNote(),
      fakeNote(),
      fakeNote(),
      fakeNote(),
      fakeNote(),
      fakeNote(),
      fakeNote(),
      fakeNote()
    ];

    $scope.openNewNoteModal = function(){
      var modal = $modal.open({
        templateUrl: '/views/modals/newNoteModal.html',
        controller: 'newNoteModal'
      });
      modal.result.then(function (note){
        console.debug(note);
      });
    };
  })
  .controller('newNoteModal', function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close('Close');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('Cancel');
    };
  });
