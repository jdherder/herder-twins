import constants from '../../app.constants';

export default class VoteController {
  constructor(firebaseService, storageService, analyticsService) {
    this.firebaseService = firebaseService;
    this.storageService = storageService;
    this.analyticsService = analyticsService;

    this.allowVote = true;
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

        /* If voteCast is provided via binding through fn reference */
        if (this.voteCast) {
          this.voteCast();
        }

        this.analyticsService.event('voted', ref);
      });
  }

}
