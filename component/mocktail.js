/**
 * @module Mocktail
 * @author Adam Timberlake
 * @see https://github.com/Wildhoney/Mocktail
 */

/**
 * @property PRODUCTION
 * @type {String}
 */
const PRODUCTION = 'production';

/**
 * @constant TESTING
 * @type {String}
 */
const TESTING = 'testing';

/**
 * @constant ENV
 * @type {{PRODUCTION: String, TESTING: String}}
 */
export const ENV = { PRODUCTION, TESTING };

/**
 * @property modules
 * @type {Map}
 */
const modules = new Map();

/**
 * @property currentEnvironment
 * @type {String}
 */
let currentEnvironment = PRODUCTION;

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
export function resolve(actualModule, nameRepresentation = '') {
    return mock(actualModule, nameRepresentation);
}

/**
 * @method mock
 * @param {Function} actualModule
 * @param {String} [nameRepresentation='']
 * @return {*}
 */
export function mock(actualModule, nameRepresentation = '') {

    if ((!actualModule.name || actualModule.name === '_class') && !nameRepresentation) {

        // Prevent the user from passing an anonymous function/class.
        throw new Error('Mocktail: Passing anonymous function to mocktail.mock; use second argument to specify a name.')

    }

    const runtimeDependency = modules.get(nameRepresentation || actualModule.name);

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
export function stub(...modules) {

    if (modules.length === 0 || typeof modules[0] === 'undefined') {

        // Prevent the developer from shooting themselves in the foot.
        throw new Error('Mocktail: You must supply at least one component to the mocktail.stub method.');

    }

    const stubbedModule = (typeof modules[1] !== 'undefined' ? modules[1] : modules[0]);
    return isProduction() ? modules[0] : stubbedModule;

}

/**
 * @method env
 * @param {String} [name=null]
 * @return {String|void}
 */
export function env(name = null) {

    if (name === null) {
        return currentEnvironment;
    }

    if (!~[PRODUCTION, TESTING].indexOf(name)) {

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
export function inject(actualName, stubModule) {

    if (typeof actualName !== 'string') {
        throw new Error('Mocktail: You must supply the function name of the object to stub.');
    }

    modules.set(actualName, stubModule);

}

/**
 * @method reset
 * @return {void}
 */
export function reset() {
    currentEnvironment = PRODUCTION;
}

// Export an object of all the functions as the default.
export default { resolve, stub, env, inject, mock, reset, ENV };
