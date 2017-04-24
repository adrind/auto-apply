'use strict';

import {suggestion} from 'suggestion';

const whitelistUrls = ['https://hiringcenter.walmartstores.com', 'https://www.facebook.com'];
const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
const USERNAME = 'adriennejobs@gmail.com';
const PASSWORD = 'Ladybug1';

const isSupportedWebsite = function(website) {
    const matches = website.match(domainRegex);

    return whitelistUrls.reduce((acc, current) => {
        return matches.includes(current) ? true : acc;
    }, false);
};


const isLoginScreen = function () {
  const passwordFields = $('input[type="password"]');
  return passwordFields.length === 1;
};

const isSignupScreen = function () {
  const passwordFields = $('input[type="password"]');
  return passwordFields.length === 2;
};


$(document).ready(function() {
    const url = window.location.href;

    if(isSupportedWebsite(url) && isSignupScreen()) {
        $('form button').click(function() {
            const passwords = $('input[type="password"]'),
                pass1 = passwords[0].value,
                pass2 = passwords[1].value,
                username = $('form input[type="text"]').val();

            if(pass1 === pass2) {
                console.log('username is ', username);
                console.log('password is ', pass1);
            }
        });
    }

    if(isSupportedWebsite(url) && isLoginScreen()) {
        const usernameInput = $('form input[type="text"]'),
              passwordInput = $('form input[type="password"]');
        usernameInput.val(USERNAME);
        passwordInput.val(PASSWORD);

        suggestion();
    }
});

