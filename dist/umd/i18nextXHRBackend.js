(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.i18nextXHRBackend = factory());
}(this, (function () { 'use strict';

var arr = [];
var each = arr.forEach;
var slice = arr.slice;

function defaults(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getDefaults() {
  return {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: 'locales/add/{{lng}}/{{ns}}',
    allowMultiLoading: false,
    parse: JSON.parse,
    crossDomain: false
  };
}

var Backend = function () {
  function Backend(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Backend);

    this.init(services, options);

    this.type = 'backend';
  }

  _createClass(Backend, [{
    key: 'init',
    value: function init(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.services = services;
      this.options = defaults(options, this.options || {}, getDefaults());
    }
  }, {
    key: 'readMulti',
    value: function readMulti(languages, namespaces, callback) {
      var loadPath = this.options.loadPath;
      if (typeof this.options.loadPath === 'function') {
        loadPath = this.options.loadPath(languages, namespaces);
      }

      throw new Error("React Native i18n XHR backend do not support readMulti option!");
    }
  }, {
    key: 'read',
    value: function read(language, namespace, callback) {
      // Read file with static config
      this.loadFile(lng, ns, callback);
    }
  }, {
    key: 'loadFile',
    value: function loadFile(lng, ns, callback) {
      var path = void 0;

      // STATIC pathes due to React Native packager do NOT support dynamic ressources
      // See: https://github.com/facebook/react-native/issues/2481, http://facebook.github.io/react-native/docs/image.html#static-resources
      if (lng == "en" && ns == "app") {
        path = "../../../../asset/locale/en/app.json";
      } else if (lng == "de" && ns == "app") {
        path = "../../../../asset/locale/de/app.json";
      } else {
        // Fallback
        path = "../../../../asset/locale/en/app.json";
      }

      try {
        content = require(path);
        callback(null, content);
      } catch (error) {
        callback(error, null);
      }
    }
  }, {
    key: 'create',
    value: function create(languages, namespace, key, fallbackValue) {
      if (typeof languages === 'string') languages = [languages];

      var payload = {};
      payload[key] = fallbackValue || '';
    }
  }]);

  return Backend;
}();

Backend.type = 'backend';

return Backend;

})));
