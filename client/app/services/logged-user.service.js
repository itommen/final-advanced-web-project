import angular from 'angular';

angular.module('advanced.services')
  .service('LoggedUser', ($state) => {
    let loggedUser;

    const login = user => {
      loggedUser = user;
    };

    const logout = () => {
      loggedUser = null;
    };

    const get = () => loggedUser;

    const ensureLogged = () => {
      if (!loggedUser) {
        $state.transitionTo('shell.login', {}, { location: 'replace' });
      }
    };

    return {
      get,
      login,
      logout,
      ensureLogged
    };
  });