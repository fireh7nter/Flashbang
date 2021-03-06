/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil; tab-width: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

if (!String.prototype.endsWith) {
  (function() {
    'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
    var defineProperty = (function() {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var toString = {}.toString;
    var endsWith = function(search) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      if (search && toString.call(search) == '[object RegExp]') {
        throw TypeError();
      }
      var stringLength = string.length;
      var searchString = String(search);
      var searchLength = searchString.length;
      var pos = stringLength;
      if (arguments.length > 1) {
        var position = arguments[1];
        if (position !== undefined) {
          // `ToInteger`
          pos = position ? Number(position) : 0;
          if (pos != pos) { // better `isNaN`
            pos = 0;
          }
        }
      }
      var end = Math.min(Math.max(pos, 0), stringLength);
      var start = end - searchLength;
      if (start < 0) {
        return false;
      }
      var index = -1;
      while (++index < searchLength) {
        if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
          return false;
        }
      }
      return true;
    };
    if (defineProperty) {
      defineProperty(String.prototype, 'endsWith', {
        'value': endsWith,
        'configurable': true,
        'writable': true
      });
    } else {
      String.prototype.endsWith = endsWith;
    }
  }());
}

if (!String.prototype.padLeft) {
  String.prototype.padLeft = function(c, n) {
    s = String(this);
    if (!c || s.length >= n) {
      return s;
    }
    var max = (n - s.length) / c.length;
    for (var i = 0; i < max; i++) {
      s = c + s;
    }
    return s;
  };
}

if (!String.prototype.padRight) {
  String.prototype.padRight = function(c, n) {
    s = String(this);
    if (!c || s.length >= n) {
      return s;
    }
    var max = (n - s.length) / c.length;
    for (var i = 0; i < max; i++) {
      s += c;
    }
    return s;
  };
}

// Polyfill for performance
(function() {
    if(window.performance && window.performance.now) return;
    if(!window.performance) window.performance = {};
    var methods = ['webkitNow', 'msNow', 'mozNow'];
    for(var i = 0; i < methods.length; i++) {
        if(window.performance[methods[i]]) {
            window.performance.now = window.performance[methods[i]];
            return;
        }
    }
    if(Date.now) {
        window.performance.now = function() {
            return Date.now();
        };
        return;
    }
    window.performance.now = function() {
        return +(new Date());
    };
})();