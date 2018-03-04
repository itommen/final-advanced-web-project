import angular from 'angular';
import io from 'socket.io-client';

import newPostDialog from './new-post';

const CONTROLLER = 'mainController';

angular.module('advanced.controllers').controller(CONTROLLER, ($scope, Post, $mdDialog) => {
  $scope.posts = Post.query();
  $scope.searchTerm = '';
  $scope.filterBy = '';

  $scope.filterTypes = ['author', 'content'];

  const socket = io('http://localhost:8318/');

  socket.on('refresh', () => {
    $scope.posts = Post.query();
  });

  $scope.search = () => {
    const filter = $scope.filterBy;
    let term = $scope.searchTerm;

    if (!filter) {
      term = '';
    }

    return Post.query({ term, filter }).$promise
      .then(result => {
        $scope.posts = result;
      });
  };

  $scope.openNewPostModal = () => $mdDialog.show({
    controller: newPostDialog.controller,
    template: newPostDialog.template,
    clickOutsideToClose: false
  });
});

export default CONTROLLER;