import angular from 'angular'

import viewApp from './viewApp/viewApp.component';
import viewVoting from './viewVoting/viewVoting.component';
import vote from './vote/vote.component';
import results from './results/results.component';

export default angular.module('app.components', [])
  .component('viewApp', viewApp)
  .component('viewVoting', viewVoting)
  .component('vote', vote)
  .component('results', results)
  .name;