import angular from 'angular';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME).controller('admin', ($scope, Post, $mdDialog, $mdToast) => {
  $scope.posts = Post.query();

  $scope.editPost = post => {
    $mdDialog.show({
      controller: 'editPost',
      templateUrl: '/app/admin/edit-post/edit-post.html',
      clickOutsideToClose: false,
      locals: {
        post
      }
    });
  };

  $scope.deletePost = post => {
    Post.delete({id: post._id}).$promise.then(() => {
      return $mdToast.show(
                $mdToast.simple()
                    .textContent('Post updated!')
                    .position('bottom left')
                    .hideDelay(3000)
            );
    });
  };
});