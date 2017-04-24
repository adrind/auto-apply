'use strict';

let data = {
    name: 'Adrienne',
    address: 'I live here',
    username: 'hi',
    password: 'test'
};

export const insertSuggestion = function (el, id) {
    $(`<span class="icon-resume-icon edit-suggestion" data-id="${id}"><span class="path1"></span><span class="path2"></span></span>`).insertAfter(el);
};

export const insertSuggestionBox = function (dataId) {
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

export const setSuggestionListeners = function () {
    $('.edit-suggestion').click(function (evt) {
        const parent = $(evt.target).parent();
        parent.hide();

        insertSuggestionBox(parent.data('id'));
    });
};
