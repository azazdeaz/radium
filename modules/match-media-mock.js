var clone = require('lodash/lang/clone');
var includes = require('lodash/collection/includes');
var pull = require('lodash/array/pull');
var mapValues = require('lodash/object/mapValues');
var forOwn = require('lodash/object/forOwn');
var mediaQuery = require('css-mediaquery');
var isNode = require('detect-node');

var config = {};
var createdMqls = {};

function matchMediaMock(query) {

  var mql = createdMqls[query];

  if (!mql) {
    mql = new MediaQueryListMock(query);
    createdMqls[query] = mql;
  }

  return mql;
}

matchMediaMock.setConfig = function (newConfig) {

  if (!newConfig) {
    return;
  }

  var matchBeforeByQuery = mapValues(createdMqls, 'matches');

  config = clone(newConfig) || {};

  forOwn(createdMqls, function (mql, query) {

    if (mql.matches !== matchBeforeByQuery[query]) {
      mql.callListeners();
    }
  });
};





function MediaQueryListMock(query) {

  this._query = query;
  this._listeners = [];
}

Object.defineProperty(MediaQueryListMock.prototype, 'matches', {

  get: function () {
    return mediaQuery.match(this._query, config);
  }
});

MediaQueryListMock.prototype.addListener = function (listener) {

  if (isNode) {
    return;
  }

  if (!includes(this._listeners, listener)) {
    this._listeners.push(listener);
  }
};

MediaQueryListMock.prototype.removeListener = function (listener) {

  pull(this._listeners, listener);
};

MediaQueryListMock.prototype.callListeners = function () {

  this._listeners.forEach(function (listener) {

    listener(this);
  });
};




module.exports = matchMediaMock;
