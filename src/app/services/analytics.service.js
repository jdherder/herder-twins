export default class AnalyticsService {
  constructor($window) {
    this.$window = $window;
  }

  event(category, action, label) {
    this.$window.ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    });
  }

  pageview(page) {
    this.$window.ga('send', {
      hitType: 'pageview',
      page,
    });
  }

}
