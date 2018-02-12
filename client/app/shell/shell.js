import angular from 'angular';
import './shell.controller';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME)
    .config($stateProvider => {
      $stateProvider
            .state('shell', {
              abstract: true,
              templateUrl: 'app/shell/shell.html',
              controller: 'shell'
            });
    });