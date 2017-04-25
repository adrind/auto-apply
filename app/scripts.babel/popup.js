'use strict';

$(document).ready(function() {
    $('.update-resume').click(function() {
        chrome.tabs.create({url: 'http://localhost:3000/'}, (tab) => {
            console.log('tab id is ', tab.id);
        })
    });

    $('.login').click(function () {
        chrome.runtime.sendMessage(null, 'login')
    })
});