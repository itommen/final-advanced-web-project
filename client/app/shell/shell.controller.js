import angular from 'angular';

import logo from './logo2.jpg';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME)
  .controller('shell', ($scope) => {
    const image = new Image();

    // image.onload = () => {
    //   const ctx = document.getElementById('logo').getContext('2d');

    //   ctx.drawImage(image, 2031, 102);
    // };
    // image.src = logo;

    $scope.image = logo;

    console.log('shell');
  });