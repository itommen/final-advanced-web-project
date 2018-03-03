import angular from 'angular';
import './shell.controller';
import './shell.less';

angular.module('advanced.controllers')
    .config($stateProvider => {
      $stateProvider
            .state('shell', {
              abstract: true,
              templateUrl: 'app/shell/shell.html',
              controller: 'shell'
            });
    });