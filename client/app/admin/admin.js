import angular from 'angular';

import controller from './admin.controller';
import template from './admin.html';

import './edit-post/edit-post.less';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME)
    .config($stateProvider => {
      $stateProvider
            .state('shell.admin', {
              url: '/admin',
              template,
              controller
            });
    });