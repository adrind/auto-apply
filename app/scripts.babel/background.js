'use strict';

chrome.runtime.onMessage.addListener((message) => {
    if(message === 'login') {
        $.get('http://localhost:3000/login').done((response) => {
            $.get(`http://localhost:3000/user/${response.id}`).done((userData) => {
                chrome.storage.sync.set({'data': userData});
            });
        });
    }
});