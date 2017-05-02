'use strict';

import DataManager from './lib/data';
const dm = new DataManager(chrome);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //Login the user and store the resume as data
    if(message.message === 'login') {
        $.get('http://localhost:3000/login', message.data).done((response) => {
            if(response.status == 200) {
                chrome.storage.sync.set({'data': response.data, 'isLoggedIn': true});
                dm.getProfile('firstName').then(name => sendResponse({isLoggedIn: true, name: name}));
            } else {
                sendResponse({isLoggedIn: false});
            }
        });
    }

    if(message.message === 'logout') {
        dm.logout().then(_ => sendResponse({isLoggedIn: false}));
    }

    //needed to make sure extension knows that sendResponse async
    return true;
});