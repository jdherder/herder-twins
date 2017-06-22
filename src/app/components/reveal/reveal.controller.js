const babya = require('../../../images/babya-circle-text.svg');
const babyb = require('../../../images/babyb-circle-text.svg');

export default class RevealController {
  constructor(analyticsService) {
    this.analyticsService = analyticsService;

    this.scratcherA = {
      id: 'baby-a-scratcher',
      text: `TEST`,
      size: 250,
      boundaryImg: babya,
    };

    this.scratcherB = {
      id: 'baby-b-scratcher',
      text: `TEST`,
      size: 250,
      boundaryImg: babyb,
    };
  }

  $onInit() {
    this.analyticsService.pageview('/reveal');
  }

}
