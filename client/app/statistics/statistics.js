import angular from 'angular';

import controller from './statistics.controller';
import template from './statistics.html';

angular.module('advanced.controllers')
    .config($stateProvider => {
      $stateProvider
            .state('shell.statistics', {
              url: '/statistics',
              template,
              controller
            });
    });