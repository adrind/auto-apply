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

const mockResume = {
  firstName: 'Adrienne',
  secondName: 'Dreyfus',
  address: '3099 Washington st',
  city: 'San Francisco',
  state: 'CA',
  zip: '94415'
};

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
    getMock(key) {
      return Promise.resolve(mockResume[key]);
    }
    getProfile(key) {
        return this.get().then((data) => {
            console.log('getting profile data', data);
            return data.profile && data.profile[key];
        });
    }
    isLoggedIn() {
        return this.get().then((data) => {
            return data.isLoggedIn;
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