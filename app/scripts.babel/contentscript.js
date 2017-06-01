'use strict';

import { insertSuggestion, setSuggestionListeners } from './lib/suggestion';
import Fill from './lib/fill';
import DataManager from './lib/data';

const fill = new Fill();
const dm = new DataManager(chrome);


//const whitelistUrls = ['https://hiringcenter.walmartstores.com', 'https://www.gci.com', 'https://secure.beaconinsight.com', 'https://providence.taleo.net', 'https://rn22.ultipro.com', 'https://rac.taleo.net'];
const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;

const getTextNodeText = function ($node) {
  return $node.contents().filter(function() {
    return this.nodeType == Node.TEXT_NODE;
  }).text();
};

const isSupportedWebsite = function(website) {
    const matches = website.match(domainRegex);

    return whitelistUrls.reduce((acc, current) => {
        return matches.includes(current) ? true : acc;
    }, false);
};

const getLabelText = function ($input) {
  const $label = $('label[for="' + $input.attr('id') + '"]');
  if($input.attr('id') && $label.length) {
    return getTextNodeText($label);
  } else if ($input.parent().prev().is('td')) {
    const text = getTextNodeText($($input.parent().prev()));
    return text || $input.parent().prev().text();
  } else if ($input.prev().length && $input.prev().prop('tagName').toLowerCase() === 'label') {
    return getTextNodeText($input.prev())
  }
};

$(document).ready(function() {
  dm.isApplying().then(isApplying => {
    const $body = $('body');
    let $currentInput;

    if(isApplying) {
      $body.addClass('auto-apply');
      $body.append('<div id="auto-apply"></div>');

      $('body #auto-apply').load('chrome-extension://plianlcbijbdlkhojhgejpfhklhcngfc/wizard.html', function () {
        dm.get().then(data => {
          const $buttonDiv = $('.wizard-button-group');

          for (let key in data) {
            if(data[key]) {
              $buttonDiv.append(`<button name="${key}">${data[key]}</button>`);
            }
          }
          
          $('.wizard-button-group button').click(function (evt) {
            $currentInput.val($(evt.target).text());
          });
        });
      });

      $('input').click(function (evt) {
        $currentInput = $(evt.target);
      });

      $('input').map((i, input) => {
        const $input = $(input);
        const labelText = getLabelText($input);

        if(labelText) {
          const key = fill.findMatch(labelText);
          if(key) {
            dm.getProfile(key).then(value => {
              $input.val(value);
            });
          }
        }
      });
    }
  });
});

