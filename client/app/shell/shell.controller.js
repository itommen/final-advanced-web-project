import angular from 'angular';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME)
    .controller('shell', () => {
      console.log('shell');
    });