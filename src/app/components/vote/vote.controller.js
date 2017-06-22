import constants from '../../app.constants';

export default class VoteController {
  constructor($state, firebaseService, storageService, analyticsService) {
    this.$state = $state;
    this.firebaseService = firebaseService;
    this.storageService = storageService;
    this.analyticsService = analyticsService;

    this.allowVote = true;
  }

  $onInit() {
    const voted = this.storageService.getItem(constants.voted);

    if (voted === 'true') {
      this.goToResults();
    } else {
      this.analyticsService.pageview('/vote');
    }
  }

  voteBoyBoy() {
    this.incrementVote(constants.voteBoyBoy);
  }

  voteGirlGirl() {
    this.incrementVote(constants.voteGirlGirl);
  }

  voteBoyGirl() {
    this.incrementVote(constants.voteBoyGirl);
  }

  goToResults() {
    this.$state.go('results');
  }

  incrementVote(ref) {
    if (!this.allowVote) {
      return;
    }

    return this.firebaseService.getData(ref)
      .then(data => {
        const currentVotesTotal = data.$value;
        const newVotesTotal = parseInt(currentVotesTotal) + 1;
        this.firebaseService.setData(ref, newVotesTotal);
        this.allowVote = false;

        this.storageService.setItem(constants.voted, true);

        this.goToResults();

        this.analyticsService.event('voted', ref);
      });
  }

}
