var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import * as utils from './utils';

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
      this.options = utils.defaults(options, this.options || {}, getDefaults());
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
      this.loadFile(language, namespace, callback);
    }
  }, {
    key: 'loadFile',
    value: function loadFile(lng, ns, callback) {
      try {
        var content = void 0;

        // STATIC pathes due to React Native packager do NOT support dynamic ressources
        // See: https://github.com/facebook/react-native/issues/2481, http://facebook.github.io/react-native/docs/image.html#static-resources
        if (lng == "en" && ns == "app") {
          content = require("../../../../asset/locale/en/app.json");
        } else if (lng == "de" && ns == "app") {
          content = require("../../../../asset/locale/de/app.json");
        } else {
          // Fallback
          content = require("../../../../asset/locale/en/app.json");
        }

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

export default Backend;