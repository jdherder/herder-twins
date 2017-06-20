export default function ($urlRouterProvider, $locationProvider, $stateProvider) {
  // $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'viewApp'
    });
}