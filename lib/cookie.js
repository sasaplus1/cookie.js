/*!
 * cookie.js Copyright(c) 2013 sasa+1
 * https://github.com/sasaplus1/cookie.js
 * Released under the MIT license.
 */


(function() {

  var util = (function() {

    var to = Object.prototype.toString;

    /**
     * check for value is Array.
     *
     * @param {*} value any value.
     * @return {Boolean} true if value is Array.
     */
    function isArray(value) {
      return (typeof value === 'object' && to.call(value) === '[object Array]');
    }

    return {
      // use Array#isArray if implemented.
      isArray: Array.isArray || isArray
    };

  }());

  /**
   * get cookie.
   *
   * get all if name is an undefined.
   *
   * @param {String|undefined} name cookie-name.
   * @return {String|null|Object} cookie-value or cookie-pairs.
   */
  function get(name) {
    var cookiePairs, i, len;

    if (name === void 0) {
      // drop code when compressing
      if (typeof Mocha !== 'undefined') {
        return convertToCookieObject_(splitToPairs_(window.mock.cookie));
      } else {
        return convertToCookieObject_(splitToPairs_(document.cookie));
      }
    }

    // drop code when compressing
    if (typeof Mocha !== 'undefined') {
      cookiePairs = splitToPairs_(window.mock.cookie);
    } else {
      cookiePairs = splitToPairs_(document.cookie);
    }

    for (i = 0, len = cookiePairs.length; i < len; ++i) {
      if (cookiePairs[i].name === name) {
        return decodeURIComponent(cookiePairs[i].value);
      }
    }

    return null;
  }

  /**
   * set cookie.
   *
   * can multiple set if name is an Array of Object.
   *
   * @param {String|Object[]} name cookie-name.
   * @param {String|undefined} value cookie-value.
   * @param {Object|undefined} options attributes object.
   * @return {Object} own instance.
   */
  function set(name, value, options) {
    var pair, pairs, i, len;

    if (!util.isArray(name)) {
      pair = options || {};
      pair.name = name;
      pair.value = value;

      // drop code when compressing
      if (typeof Mocha !== 'undefined') {
        window.mock.cookie = generateCookieString_(pair);
      } else {
        document.cookie = generateCookieString_(pair);
      }

      // method chain
      return this;
    }

    pairs = name;

    // drop code when compressing
    if (typeof Mocha !== 'undefined') {
      for (i = 0, len = pairs.length; i < len; ++i) {
        window.mock.cookie = generateCookieString_(pairs[i]);
      }
    } else {
      for (i = 0, len = pairs.length; i < len; ++i) {
        document.cookie = generateCookieString_(pairs[i]);
      }
    }

    // method chain
    return this;
  }

  /**
   * generate cookie string from data object.
   *
   * @private
   * @param {Object} object cookie data object.
   * @return {String} cookie string.
   */
  function generateCookieString_(object) {
    var cookieString = object.name + '=' + encodeURIComponent(object.value);

    object.expires && (cookieString += ';Expires=' + object.expires);
    object.maxage && (cookieString += ';Max-Age=' + object.maxage);
    object.domain && (cookieString += ';Domain=' + object.domain);
    object.path && (cookieString += ';Path=' + object.path);
    object.secure && (cookieString += ';Secure');

    return cookieString;
  }

  /**
   * split to cookie-name and cookie-value from cookie-pairs.
   *
   * from RFC 6265
   *   cookie-name:
   *     \x21\x23-\x27\x2a\x2b\x2d\x2e\x30-\x39\x41-\x5a\x5e-\x7a\x7c\x7e
   *   cookie-value:
   *     \x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E
   *
   * @private
   * @param {String} text cookie string.
   * @return {{name, value: String}[]} splitted cookie-pairs.
   */
  function splitToPairs_(text) {
    var pairs = text.split(';'),
        result = [],
        re = /([!#-'*+\-.\dA-Z^-z|~]+)=(")?([!#-+\--:<-\[\]-~]*)\2/,
        i, len, match;

    for (i = 0, len = pairs.length; i < len; ++i) {
      match = re.exec(pairs[i]);
      if (match !== null && match[3]) {
        result.push({
          name: match[1],
          value: match[3]
        });
      }
    }

    return result;
  }

  /**
   * convert to cookie object from cookie object array.
   *
   * @private
   * @param {Object} cookieObjects cookie object array.
   * @return {Object} cookie object
   */
  function convertToCookieObject_(cookieObjects) {
    var pairs = {},
        i, len;

    // I want native Array#map for legacy browsers :(
    for (i = 0, len = cookieObjects.length; i < len; ++i) {
      pairs[cookieObjects[i].name] = decodeURIComponent(cookieObjects[i].value);
    }

    return pairs;
  }

  this.cookie = {
    get: get,
    set: set
  };

}());
