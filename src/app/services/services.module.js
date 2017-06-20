import angular from 'angular'

import firebaseService from './firebase.service';
import storageService from './storage.service';
import analyticsService from './analytics.service';

export default angular.module('app.services', [])
  .service('firebaseService', firebaseService)
  .service('storageService', storageService)
  .service('analyticsService', analyticsService)
  .name;