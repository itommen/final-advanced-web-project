import angular from 'angular';

import newPostDialog from './new-post';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME).controller('main', ($scope, Post, $mdDialog) => {
  $scope.posts = Post.query();
  $scope.searchTerm = '';
  $scope.filterBy = '';

  $scope.filterTypes = ['author', 'content'];

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