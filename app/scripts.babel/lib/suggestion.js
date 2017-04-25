'use strict';

let userData = {};

const findValue = function (dataId) {
    const key = $(`div[data-id="${dataId}"] option:selected`).val();

    return new Promise((res, rej) => {

       chrome.storage.sync.get('data', function ({data}) {
           const value = data[key];

           res(value);
       });
    });
};

export const insertSuggestion = function (el, id) {
    $(`<span class="icon-resume-icon edit-suggestion" data-id="${id}"><span class="path1"></span><span class="path2"></span></span>`).insertAfter(el);
};

export const insertSuggestionBox = function (dataId) {
    $(`<div class="suggestion" data-id=${dataId}></div>`).insertAfter(`span[data-id=${dataId}]`);
    $(`.suggestion[data-id="${dataId}"]`).load('chrome-extension://plianlcbijbdlkhojhgejpfhklhcngfc/suggestion.html', function () {
        $(`div[data-id="${dataId}"] .fill-in-btn`).click((evt) => {
            evt.preventDefault(); //some sites reload page

            findValue(dataId).then((value) => {
                $(`span[data-id="${dataId}"]`).prev().val(value);
            });

        });

        $(`div[data-id="${dataId}"] .icon-cross`).click((evt) => {
            $(`.suggestion[data-id="${dataId}"]`).remove();
            $(`.edit-suggestion[data-id=${dataId}]`).show();

        })
    });
};

export const setSuggestionListeners = function () {
    $('.edit-suggestion').click(function (evt) {
        const parent = $(evt.target).parent();
        parent.hide();

        insertSuggestionBox(parent.data('id'));
    });
};
