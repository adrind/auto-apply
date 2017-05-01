'use strict';

$(document).ready(function() {
    $('.login').click(function () {
        chrome.runtime.sendMessage(null, 'login')
    });

    $('.logout').click(function () {
        chrome.runtime.sendMessage(null, 'logout', {}, function () {
            $('.login').show();
            $('.update-resume').hide();
            $('.logout').hide();
        });
    });

    chrome.storage.sync.get('user', function (data) {
        if(data.loggedIn) {
            $('.update-resume').show().click(function() {
                chrome.tabs.create({url: 'http://localhost:3000/'}, (tab) => {
                    console.log('tab id is ', tab.id);
                })
            });

            $('.logout').show();
            $('.login').hide();
        }
    });
});