import angular from 'angular';

const MODULE_NAME = 'advanced.controllers';

// need to add to the DI the advanced.filters and advanced.directives

angular.module(MODULE_NAME, ['advanced.services']);

require('./shell/shell');
require('./main/main');
require('./admin/admin');
require('./about/about');

export default MODULE_NAME;