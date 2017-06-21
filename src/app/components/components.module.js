import angular from 'angular'

import vote from './vote/vote.component';
import results from './results/results.component';
import reveal from './reveal/reveal.component';
import headerNav from './headerNav/headerNav.component';
import contentContainer from './contentContainer/contentContainer.component';

export default angular.module('app.components', [])
  .component('vote', vote)
  .component('results', results)
  .component('reveal', reveal)
  .component('headerNav', headerNav)
  .component('contentContainer', contentContainer)
  .name;