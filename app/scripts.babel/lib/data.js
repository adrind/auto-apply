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
    getProfile(key) {
        return this.get().then((data) => {
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