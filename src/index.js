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

class Backend {
  constructor(services, options = {}) {
    this.init(services, options);

    this.type = 'backend';
  }

  init(services, options = {}) {
    this.services = services;
    this.options = utils.defaults(options, this.options || {}, getDefaults());
  }

  readMulti(languages, namespaces, callback) {
    var loadPath = this.options.loadPath;
    if (typeof this.options.loadPath === 'function') {
      loadPath = this.options.loadPath(languages, namespaces);
    }

    throw new Error("React Native i18n XHR backend do not support readMulti option!");
  }

  read(language, namespace, callback) {
    // Read file with static config
    this.loadFile(language, namespace, callback);
  }

  loadFile(lng, ns, callback) {
    try {
      let content;

      // STATIC pathes due to React Native packager do NOT support dynamic ressources
      // See: https://github.com/facebook/react-native/issues/2481, http://facebook.github.io/react-native/docs/image.html#static-resources
      if (lng == "en" && ns == "app") {
        content = require("../../../../asset/locale/en/app.json");
      } else if (lng == "de" && ns == "app") {
        content = require("../../../../asset/locale/de/app.json");
      } else { // Fallback
        content = require("../../../../asset/locale/en/app.json");
      }

      callback(null, content);
    } catch (error) {
      callback(error, null);
    }
  }

  create(languages, namespace, key, fallbackValue) {
    if (typeof languages === 'string') languages = [languages];

    let payload = {};
    payload[key] = fallbackValue || '';
  }
}

Backend.type = 'backend';


export default Backend;
