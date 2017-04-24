'use strict';

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

let data = {
    name: 'Adrienne',
    address: 'I live here',
    username: USERNAME,
    password: PASSWORD
};


const isLoginScreen = function () {
  const passwordFields = $('input[type="password"]');
  return passwordFields.length === 1;
};

const isSignupScreen = function () {
  const passwordFields = $('input[type="password"]');
  return passwordFields.length === 2;
};

const insertSuggestion = function (el, id) {
    $(`<span class="icon-resume-icon edit-suggestion" data-id="${id}"><span class="path1"></span><span class="path2"></span></span>`).insertAfter(el);
};

const insertSuggestionBox = function (dataId) {
    $(`<div class="suggestion" data-id=${dataId}></div>`).insertAfter(`span[data-id=${dataId}]`);
    $(`.suggestion[data-id="${dataId}"]`).load('chrome-extension://plianlcbijbdlkhojhgejpfhklhcngfc/suggestion.html', function () {
        $(`div[data-id="${dataId}"] .fill-in-btn`).click((evt) => {
            const key = $(`div[data-id="${dataId}"] option:selected`).val(),
                  value = data[key];

            $(`span[data-id="${dataId}"]`).prev().val(value);

            return false;
        });

        $(`div[data-id="${dataId}"] .icon-cross`).click((evt) => {
            $(`.suggestion[data-id="${dataId}"]`).remove();
            $(`.edit-suggestion[data-id=${dataId}]`).show();

        })
    });


};

const setSuggestionListeners = function () {
  $('.edit-suggestion').click(function (evt) {
      const parent = $(evt.target).parent();
      parent.hide();

    insertSuggestionBox(parent.data('id'));

  });
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

        insertSuggestion('form input[type="text"]', 'username');
        insertSuggestion('form input[type="password"]', 'password');
        setSuggestionListeners();
    }

});

