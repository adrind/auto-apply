'use strict';

const $LOGOUT = '.logout',
      $LOGIN = '.login',
      $BTN_GROUP = '.btn-group',
      $UPDATE_BTN = '.update-resume',
      $LOGIN_DIV = '.login-input',
      $LOGIN_SUBMIT_BTN = '.login-submit';

$(document).ready(function() {
    $($LOGIN).click(function () {
        $($BTN_GROUP).hide();
        $($LOGIN_DIV).show();

        $($LOGIN_SUBMIT_BTN).click(function () {
            const username = $('.username-input').val(),
                password = $('.password-input').val();

            chrome.runtime.sendMessage(null, {message: 'login', data: {username, password}}, null, function ({isLoggedIn, name}) {
                if(isLoggedIn) {

                }
                $($UPDATE_BTN).show().click(function() {
                    chrome.tabs.create({url: 'http://localhost:3000/'}, (tab) => {
                        console.log('tab id is ', tab.id);
                    })
                });

                $($LOGOUT).show();
                $($LOGIN).hide();
            });
        });

    });

    $($LOGOUT).click(function () {
        chrome.runtime.sendMessage(null, 'logout', {}, function () {
            $($LOGIN).show();
            $($UPDATE_BTN).hide();
            $($LOGOUT).hide();
        });
    });

    chrome.storage.sync.get('user', function (data) {
        if(data.loggedIn) {
            $($UPDATE_BTN).show().click(function() {
                chrome.tabs.create({url: 'http://localhost:3000/'}, (tab) => {
                    console.log('tab id is ', tab.id);
                })
            });

            $($LOGOUT).show();
            $($LOGIN).hide();
        }
    });
});