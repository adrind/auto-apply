'use strict';

$(document).ready(function() {
    const $LOGOUT = $('.logout'),
        $LOGIN = $('.login'),
        $LOGGED_IN_BTN_GROUP = $('.logged-in'),
        $LOGGED_OUT_BTN_GROUP = $('.logged-out'),
        $UPDATE_BTN = $('.update-resume'),
        $LOGIN_DIV = $('.login-input'),
        $LOGIN_SUBMIT_BTN = $('.login-submit'),
        $MESSAGE = $('.message'),
        $SPINNER = $('.spinner');

    //Show username/password login inputs when a user clicks the button
    $LOGIN.click(function () {
        $LOGGED_OUT_BTN_GROUP.hide();
        $LOGIN_DIV.show();

        $LOGIN_SUBMIT_BTN.click(function () {
            const username = $('.username-input').val(),
                password = $('.password-input').val();

            $SPINNER.show();
            $LOGIN_DIV.hide();

            //Check username and password, store resume info in local storage
            chrome.runtime.sendMessage(null, {message: 'login', data: {username, password}}, null, function ({isLoggedIn, name}) {
                $SPINNER.hide();

                if(isLoggedIn) {
                    $LOGGED_IN_BTN_GROUP.show();
                    $LOGGED_OUT_BTN_GROUP.hide();

                    $MESSAGE.text(`Welcome ${name}`);
                }
                $UPDATE_BTN.show().click(function() {
                    chrome.tabs.create({url: 'http://localhost:3000/'}, (tab) => {
                        console.log('tab id is ', tab.id);
                    })
                });

                $LOGOUT.show();
                $LOGIN.hide();
            });
        });
    });

    //TODO: Logout from the current session
    $LOGOUT.click(function () {
        chrome.runtime.sendMessage(null, 'logout', {}, function () {
            $LOGGED_OUT_BTN_GROUP.show();
            $LOGGED_IN_BTN_GROUP.hide();
        });
    });

    //TODO: Allow a user to update their resume information in a new tab
    chrome.storage.sync.get('user', function (data) {
        if(data.loggedIn) {
            $UPDATE_BTN.show().click(function() {
                chrome.tabs.create({url: 'http://localhost:3000/'}, (tab) => {
                    console.log('tab id is ', tab.id);
                })
            });

            $LOGOUT.show();
            $LOGGED_OUT_BTN_GROUP.hide();
        }
    });
});