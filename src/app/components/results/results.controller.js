import constants from '../../app.constants';

export default class ResultsController {
  constructor(firebaseService) {
    this.firebaseService = firebaseService;

    this.votesObj = {};
  }

  calcPct(votes) {
    const pct = parseInt((votes / this.votesObj.total) * 100);

    if (!pct) {
      return '';
    }

    return pct + '%';
  }

  votesBoyBoy() {
    const votes = this.votesObj[constants.voteBoyBoy];
    return {
      votes,
      pct: this.calcPct(votes),
    };
  }

  votesGirlGirl() {
    const votes = this.votesObj[constants.voteGirlGirl];
    return {
      votes,
      pct: this.calcPct(votes),
    };
  }

  votesBoyGirl() {
    const votes = this.votesObj[constants.voteBoyGirl];
    return {
      votes,
      pct: this.calcPct(votes),
    };
  }

  $onChanges() {
    this.firebaseService.getResults()
      .then(votesObj => {
        this.votesObj = votesObj;
      });
  }

}
