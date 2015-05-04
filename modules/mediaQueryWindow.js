'use strict';

var currentWindow = window;

var mediaQueryWindow = {

  set: function (newWindow) {
    currentWindow = newWindow;
  },

  get: function () {
    return currentWindow;
  }
};

module.exports = mediaQueryWindow;
