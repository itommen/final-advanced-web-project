import angular from 'angular';

import logo from './logo2.jpg';

const CONTROLLER = 'shellController';

angular.module('advanced.controllers')
  .controller(CONTROLLER, ($scope, $state, Post, LoggedUser) => {
    $scope.logout = () => {
      LoggedUser.logout();
      $state.transitionTo('shell.login', {}, { location: 'replace' });
    };

    $scope.loggedUser = LoggedUser.get();
    $scope.isLogged = !!$scope.loggedUser;

    $scope.image = logo;

    console.log('shell');
  });

export default CONTROLLER;