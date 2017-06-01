'use strict';

$(document).ready(function() {
    const $LOGOUT = $('.logout'),
        $REFRESH_DATA_BTN = $('.refresh-data'),
        $LOGGED_IN_BTN_GROUP = $('.logged-in'),
        $LOGGED_OUT_BTN_GROUP = $('.logged-out'),
        $UPDATE_BTN = $('.update-resume'),
        $MESSAGE = $('.message'),
        $SPINNER = $('.spinner'),
        $START_APPLYING_BTN = $('.start-applying'),
        $STOP_APPLYING_BTN = $('.stop-applying'),
        $FB_LOGIN_BTN = $('.fb-login-button');


    $FB_LOGIN_BTN.click(function () {
      chrome.runtime.sendMessage({message: 'facebook'}, ({status}) => {
        $LOGGED_OUT_BTN_GROUP.hide();
        $LOGGED_IN_BTN_GROUP.show();
      });
    });

    $START_APPLYING_BTN.click(function () {
      chrome.storage.sync.set({isApplying: true}, function () {
        $START_APPLYING_BTN.hide();
        $STOP_APPLYING_BTN.show();
      });
    });

    $STOP_APPLYING_BTN.click(function () {
      chrome.storage.sync.set({isApplying: false}, function () {
        $START_APPLYING_BTN.show();
        $STOP_APPLYING_BTN.hide();
      });
    });

    $UPDATE_BTN.click(function() {
        chrome.tabs.create({url: 'http://rezoome-manager.herokuapp.com'}, tab => console.log('tab id is ', tab.id));
    });

    $REFRESH_DATA_BTN.click(function () {
      chrome.runtime.sendMessage(null, {message: 'refresh'}, ({status}) => {
        console.log('refreshed')
      });
    });

    //TODO: Logout from the current session
    $LOGOUT.click(function () {
        chrome.runtime.sendMessage(null, {message: 'logout'}, {}, _ => {
            $MESSAGE.text('You have been logged out');
            $LOGGED_OUT_BTN_GROUP.show();
            $LOGGED_IN_BTN_GROUP.hide();
        });
    });

    //TODO: Allow a user to update their resume information in a new tab
    chrome.storage.sync.get(({data, isApplying}) => {
        if(data.id) {
            $LOGGED_OUT_BTN_GROUP.hide();
            $LOGGED_IN_BTN_GROUP.show();

            if(isApplying) {
              $STOP_APPLYING_BTN.show();
              $START_APPLYING_BTN.hide();
            } else {
              $STOP_APPLYING_BTN.hide();
              $START_APPLYING_BTN.show();
            }
        } else {
            $LOGGED_IN_BTN_GROUP.hide();
            $LOGGED_OUT_BTN_GROUP.show();
        }
    });
});
