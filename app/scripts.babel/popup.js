'use strict';

$(document).ready(function() {
    $('.login').click(function () {
        $('.btn-group').hide();
        $('.login-input').show();

        $('.login-submit').click(function () {
            const username = $('.username-input').val(),
                password = $('.password-input').val();

            chrome.runtime.sendMessage(null, {message: 'login', data: {username, password}}, null, function ({isLoggedIn, name}) {
                if(isLoggedIn) {

                }
                $('.update-resume').show().click(function() {
                    chrome.tabs.create({url: 'http://localhost:3000/'}, (tab) => {
                        console.log('tab id is ', tab.id);
                    })
                });

                $('.logout').show();
                $('.login').hide();
            });
        });

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