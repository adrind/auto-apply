'use strict';

chrome.runtime.onMessage.addListener((message) => {
    if(message === 'login') {
        $.get(`http://localhost:3000/resume`).done((userData) => {
            chrome.storage.sync.set({'data': userData});
        });
    }
});