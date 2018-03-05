import angular from 'angular';

const CONTROLLER = 'registerController';

angular.module('advanced.controllers')
  .controller(CONTROLLER, ($scope, User) => {
    $scope.register = () => {
      return User.save($scope.user).$promise
        .then(() => {
          console.log('wowowo');
        })
        .catch(() => {
          console.log(':\\');
        });
    };
  });

export default CONTROLLER;