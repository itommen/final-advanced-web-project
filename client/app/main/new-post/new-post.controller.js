import angular from 'angular';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME).controller('newPost', ($scope, Post, $mdDialog) => {
  $scope.post = {
    content: '',
    title: '',
    author: ''
  };

  $scope.savePost = () => {
    $scope.post.date = new Date();

    Post.save($scope.post).$promise
            .then(() => $mdDialog.hide());
  };


  $scope.closeModal = () => {
    return $mdDialog.hide();
  };
});