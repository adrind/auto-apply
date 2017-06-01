'use strict';

import {findBestMatch} from 'string-similarity';

const list = [
  {key: 'firstName', value: 'first name'}, {key: 'firstName', value: 'legal first name'}, {key: 'firstName', value: 'name'},
  {key: 'address', value: 'address'}, {key: 'address', value: 'street address'}, {key: 'address', value: 'street address (line 1)'},
  {key: 'city', value: 'city'}, {key: 'state', value: 'state/province'},
  {key: 'zip', value: 'zip'}, {key: 'zip', value: 'Zip/Postal Code'},
  {key: 'secondName', value: 'last name'}, {key: 'secondName', value: 'legal last name'}, {key: 'secondName', value: 'second name'},
  {key: 'email', value: 'email'}, {key: 'email', value: 'email address'},
  {key: 'phone', value: 'phone'}, {key: 'phone', value: 'phone number'}, {key: 'phone', value: 'cellular phone number'}];

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

    return bestMatchLikelihood > .8 ? list.find(datum => datum.value === bestMatchValue).key : '';
  }

}