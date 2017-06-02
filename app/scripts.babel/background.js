'use strict';

import DataManager from './lib/data';
const dm = new DataManager(chrome);

chrome.runtime.onMessage.addListener(({message, data}, sender, sendResponse) => {
    if(message === 'logout') {
        $.get('http://rezoome-manager.herokuapp.com/signout').done(function (response) {
          //TODO: error handling
          dm.logout().then(_ => sendResponse({isLoggedIn: false})).catch(_ => sendResponse({isLoggedIn: true}));
        });
    }

    if(message === 'facebook') {
      chrome.tabs.create({url: 'http://rezoome-manager.herokuapp.com/signin'}, function (tab) {
        setTimeout(function () {
            chrome.tabs.get(tab.id, function (newTab) {
              let userId = newTab.url.split('users/')[1].split('#')[0];

              $.get(`http://rezoome-manager.herokuapp.com/user-json/${userId}`).done(function (response) {
                let name = response.name.split(' ');
                response.firstName = name[0];
                response.secondName = name[1];

                dm.set(response);

                sendResponse({status: 'success'});
              });

            });
          }, 3000);
        });
    }

    if(message === 'refresh') {
      dm.get().then(data => {
        $.get(`http://rezoome-manager.herokuapp.com/user-json/${data.id}`).done(function (response) {
          let name = response.name.split(' ');
          response.firstName = name[0];
          response.secondName = name[1];

          dm.set(response);

          sendResponse({status: 'success'});
        });
      });
    }


    //needed to make sure extension knows that sendResponse async
    return true;
});