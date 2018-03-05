import angular from 'angular';

const CONTROLLER = 'newPost';

angular.module('advanced.controllers').controller(CONTROLLER, ($scope, Post, $mdDialog, LoggedUser) => {
  const loggedUser = LoggedUser.get();
  
  $scope.post = {
    content: '',
    title: '',
    author: loggedUser.userName
  };

  $scope.savePost = () => {
    $scope.post.date = new Date();

    return Post.save($scope.post).$promise
      .then($mdDialog.hide);
  };


  $scope.closeModal = $mdDialog.hide;
});

export default CONTROLLER;