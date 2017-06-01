'use strict';

/* Data manager to manage storing/fetching data from chrome
 * Current setup:
 * Data (obj)
 * * Profile (obj)
 * * * firstName
 * * * secondName
 * * * address
 * * isLoggedIn (boolean)
 * */

export default class DataManager {
    constructor(chrome) {
        this.chrome = chrome;
    }
    get() {
        return new Promise((res, rej) => {
            this.chrome.storage.sync.get('data', function (data) {
                res(data.data);
            });
        });
    }
    isApplying() {
      return new Promise((res, rej) => {
        this.chrome.storage.sync.get('isApplying', function (data) {
          res(data && data.isApplying);
        });
      });
    }
    getMock(key) {
        return Promise.resolve(mockResume[key]);
      }
    getProfile(key) {
        return this.get().then((data) => {
            return data && data[key];
        });
    }
    isLoggedIn() {
        return this.get().then((data) => {
            return data.isLoggedIn;
        });
    }
    set(data) {
      console.log('setting data', data);

      return new Promise((res, rej) => {
        this.chrome.storage.sync.set({'data': data}, function () {
          res();
        });
      });
    }
    logout() {
      return new Promise((res, rej) => {
            this.chrome.storage.sync.clear((err) => {
                if(err) {
                    rej();
                } else {
                    res();
                }
            });
        });
    }
}