'use strict';

import {findBestMatch} from 'string-similarity';

const list = [{key: 'firstName', value: 'first name'}, {key: 'firstName', value: 'legal first name'}, {key: 'firstName', value: 'name'}, {key: 'address', value: 'address'}];

export default class Fill {
  constructor() {
    console.log('init')
  }
  findMatch(key) {
    let normalizedKey = key.toLowerCase();
    const values = list.map(datum => datum.value);
    const bestMatch = findBestMatch(normalizedKey, values);
    const bestMatchValue = bestMatch.bestMatch.target;
    console.log('best match', bestMatch);

    return list.find(datum => datum.value === bestMatchValue).key;
  }

}