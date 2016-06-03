'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = undefined;

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = exports.Config = function () {
  function Config() {
    _classCallCheck(this, Config);

    this.defaults = {
      location: '{{framework}}/{{view}}.html',
      framework: 'bootstrap'
    };
    this.namespaces = {};

    this.namespaces.defaults = this.defaults;
  }

  Config.prototype.configureDefaults = function configureDefaults(configs) {
    (0, _extend2.default)(true, this.defaults, configs);

    return this;
  };

  Config.prototype.configureNamespace = function configureNamespace(name) {
    var configs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var namespace = this.fetch(name);
    (0, _extend2.default)(true, namespace, configs);
    var config = {};
    config[name] = namespace;
    this.configure(config);

    return this;
  };

  Config.prototype.configure = function configure(config) {
    (0, _extend2.default)(true, this.namespaces, config);

    return this;
  };

  Config.prototype.fetch = function fetch(properties) {
    if (!this.namespaces[properties]) {
      return Object.create(this.defaults);
    }

    var result = this.namespaces;

    for (var index in arguments) {
      var key = arguments[index];
      var value = result[key];
      if (!value) {
        return value;
      }
      result = result[key];
    }

    return result;
  };

  return Config;
}();