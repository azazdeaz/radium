'use strict';

var isNode = require('detect-node');

var _matcher = !isNode && window.matchMedia;

function matchMedia(query) {

  return _matcher(query);
}

matchMedia.replace = function (newMatcher) {
  _matcher = newMatcher;
};

module.exports = matchMedia;
