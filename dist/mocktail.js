/**
 * @module Mocktail
 * @author Adam Timberlake
 * @see https://github.com/Wildhoney/Mocktail
 */

/**
 * @property PRODUCTION
 * @type {String}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.resolve = resolve;
exports.mock = mock;
exports.stub = stub;
exports.env = env;
exports.inject = inject;
exports.reset = reset;
var PRODUCTION = 'production';

/**
 * @constant TESTING
 * @type {String}
 */
var TESTING = 'testing';

/**
 * @constant ENV
 * @type {{PRODUCTION: String, TESTING: String}}
 */
var ENV = { PRODUCTION: PRODUCTION, TESTING: TESTING };

exports.ENV = ENV;
/**
 * @property modules
 * @type {Map}
 */
var modules = new Map();

/**
 * @property currentEnvironment
 * @type {String}
 */
var currentEnvironment = PRODUCTION;

/**
 * @method isProduction
 * @return {Boolean}
 */
function isProduction() {
  return currentEnvironment === PRODUCTION;
}

/**
 * @method resolve
 * @param {Function} actualModule
 * @param {String} nameRepresentation
 * @return {*}
 */

function resolve(actualModule) {
  var nameRepresentation = arguments[1] === undefined ? '' : arguments[1];

  return mock(actualModule, nameRepresentation);
}

/**
 * @method mock
 * @param {Function} actualModule
 * @param {String} [nameRepresentation='']
 * @return {*}
 */

function mock(actualModule) {
  var nameRepresentation = arguments[1] === undefined ? '' : arguments[1];

  if ((!actualModule.name || actualModule.name === '_class') && !nameRepresentation) {

    // Prevent the user from passing an anonymous function/class.
    throw new Error('Mocktail: Passing anonymous function to mocktail.mock; use second argument to specify a name.');
  }

  var runtimeDependency = modules.get(nameRepresentation || actualModule.name);

  if (!isProduction() && typeof runtimeDependency !== 'undefined') {
    return runtimeDependency;
  }

  return actualModule;
}

/**
 * @method stub
 * @param {Array} modules
 * @return {*}
 */

function stub() {
  for (var _len = arguments.length, modules = Array(_len), _key = 0; _key < _len; _key++) {
    modules[_key] = arguments[_key];
  }

  if (modules.length === 0 || typeof modules[0] === 'undefined') {

    // Prevent the developer from shooting themselves in the foot.
    throw new Error('Mocktail: You must supply at least one component to the mocktail.stub method.');
  }

  var stubbedModule = typeof modules[1] !== 'undefined' ? modules[1] : modules[0];
  return isProduction() ? modules[0] : stubbedModule;
}

/**
 * @method env
 * @param {String} [name=null]
 * @return {String|void}
 */

function env() {
  var name = arguments[0] === undefined ? null : arguments[0];

  if (name === null) {
    return currentEnvironment;
  }

  if (! ~[PRODUCTION, TESTING].indexOf(name)) {

    // Ensure the developer is passing the correct values to avoid disappointment.
    throw new Error('Mocktail: Environment must be either mocktail.ENV.PRODUCTION or mocktail.ENV.TESTING.');
  }

  currentEnvironment = name;
}

/**
 * @method inject
 * @param {String} actualName
 * @param {*} stubModule
 * @return {void}
 */

function inject(actualName, stubModule) {

  if (typeof actualName !== 'string') {
    throw new Error('Mocktail: You must supply the function name of the object to stub.');
  }

  modules.set(actualName, stubModule);
}

/**
 * @method reset
 * @return {void}
 */

function reset() {
  currentEnvironment = PRODUCTION;
}

// Export an object of all the functions as the default.
exports['default'] = { resolve: resolve, stub: stub, env: env, inject: inject, mock: mock, reset: reset, ENV: ENV };