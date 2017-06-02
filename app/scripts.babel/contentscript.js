'use strict';

import Fill from './lib/fill';
import DataManager from './lib/data';

const fill = new Fill();
const dm = new DataManager(chrome);


const getTextNodeText = function ($node) {
  return $node.contents().filter(function() {
    return this.nodeType == Node.TEXT_NODE;
  }).text();
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

//TODO: Change API to filter this
const isValidKey = function (key) {
  return !['created_at', 'id', 'updated_at', 'user_id', 'name', 'uid'].includes(key)
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
            const val = data[key];

            if(val && typeof val === 'object' && isValidKey(key)) {
              $buttonDiv.append(`<div class="wizard-group ${key}-jobs"></div>`);
              val.forEach(datum => {
                for (let newKey in datum) {
                  if(isValidKey(newKey) && datum[newKey]) {
                    $(`.${key}-jobs`).append(`<button name="${datum.id}-${newKey}">${datum[newKey]}</button>`)
                  }
                }
              });
            } else if(val && isValidKey(key)) {
              $buttonDiv.append(`<button name="${key}">${val}</button>`);
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

