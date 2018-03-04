import angular from 'angular';

import logo from './logo2.jpg';

const CONTROLLER = 'shellController';

angular.module('advanced.controllers')
  .controller(CONTROLLER, $scope => {
    // const image = new Image();

    // image.onload = () => {
    //   const ctx = document.getElementById('logo').getContext('2d');

    //   ctx.drawImage(image, 2031, 102);
    // };
    // image.src = logo;

    $scope.image = logo;

    console.log('shell');
  });

export default CONTROLLER;