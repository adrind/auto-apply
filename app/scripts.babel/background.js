'use strict';

import DataManager from './lib/data';
const dm = new DataManager(chrome);

chrome.runtime.onMessage.addListener(({message, data}, sender, sendResponse) => {
    //Login the user and store the resume as data
    if(message === 'login') {
        $.get('http://localhost:3000/login', data).done((response) => {
            if(response.status == 200) {
                chrome.storage.sync.set({data: response.data, isLoggedIn: true});
                dm.getProfile('firstName').then(name => sendResponse({isLoggedIn: true, name: name}));
            } else {
                sendResponse({isLoggedIn: false});
            }
        });
    }

    if(message === 'logout') {
        dm.logout().then(_ => sendResponse({isLoggedIn: false})).catch(_ => sendResponse({isLoggedIn: true}));
    }

    //needed to make sure extension knows that sendResponse async
    return true;
});