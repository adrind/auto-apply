'use strict';

import {findBestMatch} from 'string-similarity';

const list = [{key: 'firstName', value: 'first name'}, {key: 'firstName', value: 'legal first name'}, {key: 'firstName', value: 'name'}, {key: 'address', value: 'address'},
  {key: 'city', value: 'city'}, {key: 'zip', value: 'zip code'}, {key: 'secondName', value: 'last name'}, {key: 'secondName', value: 'legal last name'}, {key: 'secondName', value: 'second name'}];

export default class Fill {
  constructor() {
    console.log('init')
  }
  findMatch(key) {
    const normalizedKey = key.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'').trim();

    const values = list.map(datum => datum.value);
    const bestMatch = findBestMatch(normalizedKey, values);
    const bestMatchValue = bestMatch.bestMatch.target;
    const bestMatchLikelihood = bestMatch.bestMatch.rating;

    return bestMatchLikelihood > .6 ? list.find(datum => datum.value === bestMatchValue).key : '';
  }

}