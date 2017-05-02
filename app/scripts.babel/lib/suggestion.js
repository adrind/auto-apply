'use strict';

import DataManager from './data';
const dm = new DataManager(chrome);

const findValue = (dataId) => {
    const key = $(`div[data-id="${dataId}"] option:selected`).val();
    return dm.getProfile(key);
};

export const insertSuggestion = (el, id) => {
    $(`<span class="icon-resume-icon edit-suggestion" data-id="${id}"><span class="path1"></span><span class="path2"></span></span>`).insertAfter(el);
};

export const insertSuggestionBox = (dataId) => {
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

export const setSuggestionListeners = () => {
    $('.edit-suggestion').click(function (evt) {
        const parent = $(evt.target).parent();
        parent.hide();

        insertSuggestionBox(parent.data('id'));
    });
};
