'use strict';

import DataManager from './lib/data';
const dm = new DataManager(chrome);


const FB_CLIENT_ID = 1523477781017871,
      FB_LOGIN_REDIRECT_URI = 'http://localhost:3000/auth';

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

    if(message === 'facebook') {
      window.open(`https://www.facebook.com/v2.9/dialog/oauth?client_id=${FB_CLIENT_ID}&redirect_uri=${FB_LOGIN_REDIRECT_URI}&scope=public_profile,user_education_history`);
    }

    //needed to make sure extension knows that sendResponse async
    return true;
});