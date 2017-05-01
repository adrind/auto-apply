'use strict';

chrome.runtime.onMessage.addListener((message) => {
    if(message === 'login') {
        $.get('http://localhost:3000/resumeJson').done((userData) => {
            chrome.storage.sync.set({'data': userData});
        });
    }

    if(message === 'logout') {
        $.get('http://localhost:3000').done((userData) => {
            chrome.storage.sync.remove('data');
        });
    }
});