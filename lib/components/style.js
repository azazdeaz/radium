'use strict';

var createMarkupForStyles = require('../create-markup-for-styles');
var Prefixer = require('../prefixer');

var React = require('react');

var buildCssString = function buildCssString(selector, rules) {
  if (!selector || !rules) {
    return;
  }

  var prefixedRules = Prefixer.getPrefixedStyle(rules, 'css');
  var serializedRules = createMarkupForStyles(prefixedRules);

  return selector + '{' + serializedRules + '}';
};

var Style = React.createClass({
  displayName: 'Style',

  propTypes: {
    scopeSelector: React.PropTypes.string,
    rules: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      scopeSelector: ''
    };
  },

  _buildStyles: function _buildStyles(styles) {
    var _this = this;

    return Object.keys(styles).reduce(function (accumulator, selector) {
      var rules = styles[selector];

      if (selector === 'mediaQueries') {
        accumulator += _this._buildMediaQueryString(rules);
      } else {
        var completeSelector = (_this.props.scopeSelector ? _this.props.scopeSelector + ' ' : '') + selector;
        accumulator += buildCssString(completeSelector, rules);
      }

      return accumulator;
    }, '');
  },

  _buildMediaQueryString: function _buildMediaQueryString(mediaQueryObj) {
    var _this2 = this;

    var contextMediaQueries = this._getContextMediaQueries();
    var mediaQueryString = '';

    Object.keys(mediaQueryObj).forEach(function (query) {
      var completeQuery = contextMediaQueries[query] ? contextMediaQueries[query] : query;
      mediaQueryString += '@media ' + completeQuery + '{' + _this2._buildStyles(mediaQueryObj[query]) + '}';
    });

    return mediaQueryString;
  },

  _getContextMediaQueries: function _getContextMediaQueries() {
    var contextMediaQueries = {};
    if (this.context && this.context.mediaQueries) {
      Object.keys(this.context.mediaQueries).forEach((function (query) {
        contextMediaQueries[query] = this.context.mediaQueries[query].media;
      }).bind(this));
    }

    return contextMediaQueries;
  },

  render: function render() {
    if (!this.props.rules) {
      return null;
    }

    var styles = this._buildStyles(this.props.rules);

    return React.createElement('style', { dangerouslySetInnerHTML: { __html: styles } });
  }
});

module.exports = Style;