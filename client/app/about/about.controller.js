import angular from 'angular';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME).controller('about', ($scope, $http) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const imageObj = new Image();

  imageObj.src = 'https://yt3.ggpht.com/0v8T0CTAv8VPxA5lJtz-tqJe-tR-3VQc0ONhD6Az2RWjNRnwh5QQzPYz5I7wbYljU_tQjZ2ok2W59_v_=s900-nd-c-c0xffffffff-rj-k-no';

  imageObj.onload = function () {
    context.drawImage(imageObj, 500, 500);
  };

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

  $http(request).then(response => {
    $scope.data = response.data.list[0].weather[0].description;
  });
});