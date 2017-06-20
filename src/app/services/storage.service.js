export default class StorageService {
  constructor($window) {
    this.$window = $window;
  }

  getItem(key) {
    if (!this.storageAvailable()) {
      return false;
    }

    return this.$window.localStorage.getItem(key);
  }

  setItem(key, data) {
    if (!this.storageAvailable()) {
      return false;
    }

    this.$window.localStorage.setItem(key, data);
  }

  /**
   * @description Check if storage type is available, example from MDN.
   * @param {string} type
   * @returns {boolean}
   */
  storageAvailable() {
    try {
      const storage = window['localStorage'];
      const x = '__storage_test__';

      storage.setItem(x, x);
      storage.removeItem(x);

      return true;

    } catch(e) {

      return e instanceof DOMException && (
          // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }

}