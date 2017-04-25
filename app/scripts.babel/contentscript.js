'use strict';

import { insertSuggestion, setSuggestionListeners } from './lib/suggestion';

const whitelistUrls = ['https://hiringcenter.walmartstores.com', 'https://www.facebook.com'];
const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;


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

const hasFormFields = function () {
  const inputFields = $('form input[type="text"]'),
        textAreas = $('form textarea');
  return inputFields.length || textAreas.length;
};


$(document).ready(function() {
    const url = window.location.href;
    if(isSupportedWebsite(url)) {
        if(isSignupScreen()) {
            //Special logic to save username and pass
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
        } else if (isLoginScreen()) {
            insertSuggestion('form input[type="text"]', 'username');
            insertSuggestion('form input[type="password"]', 'password');
            setSuggestionListeners();
        } else if (hasFormFields()) {
            $('form input[type="text"]').map((i, el) => {
               insertSuggestion($(el), el.name);
            });
            setSuggestionListeners();
        }
    }
});

