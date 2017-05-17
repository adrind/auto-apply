'use strict';

import { insertSuggestion, setSuggestionListeners } from './lib/suggestion';
import Fill from './lib/fill';
import DataManager from './lib/data';

const fill = new Fill();
const dm = new DataManager(chrome);


const whitelistUrls = ['https://hiringcenter.walmartstores.com', 'https://www.gci.com', 'https://secure.beaconinsight.com'];
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
  if($input.attr('id')) {
    const $label = $(`label[for="${$input.attr('id')}"]`);
    return getTextNodeText($input);
  } else if ($input.parent().prev().is('td')) {
    return getTextNodeText($($input.parent().prev()))
  }
};

$(document).ready(function() {
    const url = window.location.href;
    if(isSupportedWebsite(url)) {
      $('input').map((i, input) => {
        const $input = $(input);
        const labelText = getLabelText($input);


        if(labelText) {
          const key = fill.findMatch(labelText);
          if(key) {
            dm.getProfile(key).then(value => {
              console.log('setting value', value);
              $input.value(value);
            });
          }
        }
      })
    }
});

