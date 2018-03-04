import angular from 'angular';

import { remove } from 'lodash';

import editPostDialog from './edit-post';

const CONTROLLER = 'adminController';

angular.module('advanced.controllers')
.controller(CONTROLLER, ($scope, Post, $mdDialog, $mdToast) => {
  $scope.posts = Post.query();

  $scope.editPost = post => $mdDialog.show({
    controller: editPostDialog.controller,
    template: editPostDialog.template,
    clickOutsideToClose: false,
    locals: {
      post
    }
  });

  $scope.deletePost = post => Post.delete({ id: post._id }).$promise
    .then(() => remove($scope.posts, ({ _id }) => _id === post._id))
    .then(() => $mdToast.show($mdToast.simple()
      .textContent('Post deleted!')
      .position('bottom left')
      .hideDelay(3000)
    ));
});

export default CONTROLLER;