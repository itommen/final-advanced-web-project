import angular from 'angular';

const CONTROLLER = 'aboutController';

angular.module('advanced.controllers').controller(CONTROLLER, ($scope, $http, LoggedUser) => {
  LoggedUser.ensureLogged();

  const URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

  const request = {
    method: 'GET',
    url: URL,
    params: {
      q: 'Jerusalem',
      mode: 'json',
      units: 'imperial',
      cnt: '7',
      appid: '51382f05320b25f9782e3ce520ca2e19'
    }
  };

  $http(request)
    .then(response => {
      $scope.data = response.data.list[0].weather[0].description;
    });
});

export default CONTROLLER;