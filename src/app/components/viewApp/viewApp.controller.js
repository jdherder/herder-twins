import constants from '../../app.constants';

export default class ViewAppController {
  constructor(storageService) {
    this.storageService = storageService;

    this.allowVoting = true;
    this.showVoting = true;
    this.showResults = false;
  }

  voteCast() {
    console.log('vote cast!');
    this.showVoting = false;
    this.showResults = true;
    this.allowVoting = false;
  }

  viewResults() {
    this.showVoting = false;
    this.showResults = true;
  }

  $onInit() {
    const voted = this.storageService.getItem(constants.voted);

    if (voted === 'true') {
      this.voteCast();
    }
  }
}
