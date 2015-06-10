/* @flow */

'use strict';

var ExecutionEnvironment = require('exenv');

var _matchMediaFunction = ExecutionEnvironment.canUseDOM && window && window.matchMedia;
var _mediaQueryAliases = new Map();

module.exports = {
  canMatchMedia: function canMatchMedia() {
    return typeof _matchMediaFunction === 'function';
  },

  matchMedia: function matchMedia(query) {
    return _matchMediaFunction(query);
  },

  setMatchMedia: function setMatchMedia(nextMatchMediaFunction) {
    _matchMediaFunction = nextMatchMediaFunction;
  },

  setMediaQueryAlias: function setMediaQueryAlias(alias, query) {
    if (alias.indexOf('@') !== 0) {
      throw new Error('alias should start with "@"');
    }
    if (query.indexOf('@media ') !== 0) {
      throw new Error('query should start with "@media "');
    }

    _mediaQueryAliases.set(alias, query);
  },

  getMediaQueryByAlias: function getMediaQueryByAlias(alias) {
    return _mediaQueryAliases.get(alias);
  },

  isMediaQueryAlias: function isMediaQueryAlias(alias) {
    return _mediaQueryAliases.has(alias);
  }
};