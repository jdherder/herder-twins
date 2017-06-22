const babya = require('../../../images/babya-circle-text.svg');
const babyb = require('../../../images/babyb-circle-text.svg');

export default class RevealController {
  constructor() {
    this.scratcherA = {
      text: `TEST`,
      size: 250,
      boundaryImg: babya,
    };

    this.scratcherB = {
      text: `TEST`,
      size: 250,
      boundaryImg: babyb,
    };
  }

}
