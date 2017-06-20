import firebase from 'firebase';

import constants from '../app.constants';

export default class FirebaseService {
  constructor($firebaseObject, $q) {
    this.$firebaseObject = $firebaseObject;
    this.$q = $q;

    this.name = 'FirebaseService';
  }

  extractValue(loadedDataObj) {
    return loadedDataObj.$value;
  }

  getData(path) {
    const data = this.getSyncObj(path);

    return data.$loaded()
      .then(function() {
        console.log('firebase, data', data);
        return data;
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  getVotesObj(path) {
    return this.getData(path)
      .then(data => this.extractValue(data))
      .then(data => {
        return {
          [path]: data,
          voteCount: data,
        };
      });
  }

  getResults() {
    return this.$q.all([
      this.getVotesObj(constants.voteBoyBoy),
      this.getVotesObj(constants.voteGirlGirl),
      this.getVotesObj(constants.voteBoyGirl),
    ])
      .then(voteObjs => {
        const allVotes = {};
        let total = 0;

        voteObjs.forEach(voteObj => {
          /* add this categories votes count (voteCount) to total value */
          total += parseInt(voteObj.voteCount);

          /* delete voteCount before merging object keys */
          delete voteObj.voteCount;

          /* merge object keys into allVotes */
          Object.assign(allVotes, voteObj);
        });

        allVotes.total = total;

        console.log('allVotes', allVotes, total);

        return allVotes;
      });
  }

  getSyncObj(path) {
    const ref = firebase.database().ref(path);
    return this.$firebaseObject(ref);
  }

  setData(path, data) {
    firebase.database().ref(path).set(data);
  }

}