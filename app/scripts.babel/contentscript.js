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

//Infers label text for a textbox
const getLabelText = function ($input) {
  const $label = $('label[for="' + $input.attr('id') + '"]');
  if($input.attr('id') && $label.length) {
    return getTextNodeText($label);
  } else if ($input.parent().prev().is('td')) {
    const text = getTextNodeText($($input.parent().prev()));
    return text || $input.parent().prev().text();
  } else if ($input.prev().length && $input.prev().prop('tagName').toLowerCase() === 'label') {
    return getTextNodeText($input.prev())
  } else if ($input.siblings('label').length) {
    return getTextNodeText($input.siblings('label').first())
  }
};

//TODO: Change API to filter this
const isValidKey = function (key) {
  return !['created_at', 'id', 'updated_at', 'user_id', 'uid', 'provider'].includes(key)
};

const renderNestedData = function (data, className) {
  data.forEach(datum => {
    for (let newKey in datum) {
      if(isValidKey(newKey) && datum[newKey]) {
        $(`.${className}`).append(`<button name="${datum.id}-${newKey}" class="pure-button">${datum[newKey]}</button>`)
      }
    }
  });
};

$(document).ready(function() {
  dm.isApplying().then(isApplying => {
    const $body = $('body');
    const $inputs = $('input');
    let $currentInput;

    if(isApplying) {
      $body.addClass('auto-apply');
      $body.append('<div id="auto-apply"></div>');

      $('body #auto-apply').load('chrome-extension://plianlcbijbdlkhojhgejpfhklhcngfc/wizard.html', function () {
        dm.get().then(data => {
          const $buttonDiv = $('.wizard-button-group');
          $buttonDiv.append(`<div class="wizard-group cfa-personal-group"><h5>Personal Data</h5></div>`);

          const $personalInfoDiv = $('.cfa-personal-group');
          for (let key in data) {
            const val = data[key];

            if(key === 'jobs') {
              $buttonDiv.append(`<div class="wizard-group cfa-job-group"><h5>Jobs</h5></div>`);
              renderNestedData(val, 'cfa-job-group');
            } else if(key === 'educations') {
              $buttonDiv.append(`<div class="wizard-group cfa-education-group"><h5>Education</h5></div>`);
              renderNestedData(val, 'cfa-education-group');
            } else if(val && isValidKey(key)) {
              $personalInfoDiv.append(`<button name="${key}" class="pure-button">${val}</button>`);
            }
          }

          
          $('.wizard-button-group button').click(function (evt) {
            $currentInput.val($(evt.target).text());
          });
        });
      });

      //Set listener so we know which input a user clicked
      $inputs.click(function (evt) {
        $currentInput = $(evt.target);
      });

      //Autofill where we can!
      $inputs.map((i, input) => {
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

