//require global assets
require('../styles/main.scss');

//import vendor modules
import angular from 'angular';
import ngAnimate from 'angular-animate';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

//import app modules
import constants from './app.constants';
import routing from './app.routing';
import firebaseConfig from './firebase.config';
import polyfills from './polyfills';
import components from './components/components.module';
import directives from './directives/directives.module';
import services from './services/services.module';

angular
  .module('app', [
    ngAnimate,
    uirouter,
    angularfire,
    components,
    directives,
    services,
  ])
  .constant('constants', constants)
  .config(polyfills)
  .config(routing)
  .config(firebaseConfig);