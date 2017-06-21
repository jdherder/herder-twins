export default function ($urlRouterProvider, $locationProvider, $stateProvider) {
  // $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/vote');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'vote'
    })
    .state('vote', {
      url: '/vote',
      component: 'vote'
    })
    .state('results', {
      url: '/results',
      component: 'results'
    })
    .state('reveal', {
      url: '/reveal',
      component: 'reveal'
    });
}