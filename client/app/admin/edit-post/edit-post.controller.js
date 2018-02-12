import angular from 'angular';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME).controller('editPost', ($scope, Post, $mdDialog, $mdToast, post) => {
  $scope.post = {
    author: post.author,
    content: post.content,
    title: post.title
  };

  $scope.editPost = () => {
    Post.update({id: post._id}, $scope.post).$promise
            .then(() => $mdDialog.hide())
            .then(() => {
              return $mdToast.show(
                    $mdToast.simple()
                        .textContent('Post updated!')
                        .position('bottom left')
                        .hideDelay(3000)
                );
            });
  };

  $scope.closeModal = () => {
    return $mdDialog.hide();
  };
});