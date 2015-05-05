'use strict';

var _matcher = window.matchMedia;

function matchMedia(query) {

  return _matcher(query);
}

matchMedia.replace = function (newMatcher) {

  _matcher = newMatcher;
};

module.exports = matchMedia;
