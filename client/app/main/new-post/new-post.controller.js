import angular from 'angular';

const CONTROLLER = 'newPost';

angular.module('advanced.controllers').controller(CONTROLLER, ($scope, Post, $mdDialog) => {
  $scope.post = {
    content: '',
    title: '',
    author: ''
  };

  $scope.savePost = () => {
    $scope.post.date = new Date();

    return Post.save($scope.post).$promise
      .then($mdDialog.hide);
  };


  $scope.closeModal = $mdDialog.hide;
});

export default CONTROLLER;