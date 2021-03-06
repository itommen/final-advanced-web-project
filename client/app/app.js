import angular from 'angular';
import 'angular-moment';
import angularMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import ngMap from 'ngmap';

import advancedServices from './services';
import advancedControllers from './controllers';

import 'mdi/css/materialdesignicons.css';
import 'angular-material/angular-material.css';
import './style.less';

angular.module('advanced', [
  angularMaterial,
  uiRouter,
  ngMap,
  'angularMoment',
  'ngAnimate',
  advancedControllers,
  advancedServices
])
    .config(($urlRouterProvider, $locationProvider, $mdThemingProvider) => {
      $mdThemingProvider.theme('default')
            .primaryPalette('purple', {
              default: '500'
            })
            .warnPalette('blue-grey', {
              default: '900',
              'hue-1': '50'
            })
            .accentPalette('amber', {
              default: '400',
              'hue-1': '600'
            });

      $urlRouterProvider
            .otherwise('/');

      $locationProvider.html5Mode(true);
    })
    .run(amMoment => {
      amMoment.changeLocale('en');
    });