'use strict';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.message === 'login') {
        console.log('get this data', message.data);

        $.get('http://localhost:3000/login', message.data).done((response) => {
            if(response.status == 200) {
                chrome.storage.sync.set({'data': response.data});
                console.log('logged in! sending response', sendResponse);
                sendResponse({isLoggedIn: true});

            } else {
                console.log('wrong password');
                sendResponse({isLoggedIn: false});
            }
        });
    }

    if(message.message === 'logout') {
        $.get('http://localhost:3000').done((userData) => {
            chrome.storage.sync.remove('data');
        });
    }
    return true;
});