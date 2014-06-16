'use strict';

angular.module('cougarApp')
  .controller('PropertyDetailsCtrl', function ($scope, Property, $stateParams, File, $modal, $http, $upload) {
    $scope.property = Property.get({ Uid: $stateParams.Uid, embed: 'models,leases' }, function(property){
        //$scope.property.workflow_statuses = $scope.property.workflow_status()[0];
        console.debug(property);
        $scope.property.PictureUrl = $scope.property.getPictureUrl();
    });

    $scope.files = File.query();

    $scope.editLabel = 'Edit';
    $scope.editDirty = false;
    $scope.edit = function(){
      $scope.editLabel == 'Edit' ? $scope.editLabel = 'Done' : $scope.editLabel = 'Edit';
      $scope.editDirty = true;
      $scope.$broadcast('editAll');
    };

    $scope.updateProperty = function(property){
      console.log(property);
      if(property.ImgUpload){
        console.log(property.ImgUpload);
        $http.post('/services/upload/Image?ParentId='+property.Uid+'&ParentType=Property', {
          
        })
        .success(function(data){
          console.log('Upload:');
          console.log(data);
        });
      };
      $scope.clear();
      property.$update();
    };

    $scope.clear = function(){
      $scope.editLabel == 'Edit' ? $scope.editLabel = 'Done' : $scope.editLabel = 'Edit';
      $scope.editDirty = false;
      $scope.$broadcast('editAll');
    };

    $scope.openUploadFileModal = function(){
      var modal = $modal.open({
        templateUrl: '/views/modals/uploadFileModal.html',
        controller: 'uploadFileModal'
      });
      modal.result.then(function (file){
        $scope.files.push(file);
      });
    };

    $scope.openCougarWModal = function(){
      var modal = $modal.open({
        templateUrl: '/views/modals/cougarWModal.html',
        controller: 'cougarWModal',
        scope: $scope
      });
      modal.result.then(function (){
        console.log('Downloading .cougarW...');
      });
    };

    $scope._ = window._;
  })
  .controller('uploadFileModal', function ($scope, $modalInstance, File) {
    $scope.file = new File;
    $scope.ok = function () {
      $modalInstance.close($scope.file);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    console.log('Uploading modal...');
  })
  .controller('cougarWModal', function ($scope, $modalInstance){
    $scope.ok = function () {
      $scope.property.CurrentModel.CheckedOutBy = $scope.user.UserName;
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
