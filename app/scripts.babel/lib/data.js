'use strict';

export default class DataManager {
    constructor(chrome) {
        this.chrome = chrome;
    }
    get() {
        return new Promise((res, rej) => {
            this.chrome.storage.sync.get('data', function (data) {
                console.log('Fetching data from DM!', data);
                res(data.data);
            });
        });
    }
    getProfile(key) {
        return this.get().then((data) => {
            return data.profile && data.profile[key];
        });
    }
}