/**
 * @module Mocktail
 * @author Adam Timberlake
 * @see https://github.com/Wildhoney/Mocktail
 */
class Mocktail {

    /**
     * @property PRODUCTION
     * @type {String}
     */
    static PRODUCTION = 'production';

    /**
     * @property TESTING
     * @type {String}
     */
    static TESTING = 'testing';

    /**
     * @constructor
     */
    constructor() {
        this.modules = new Map();
        this.ENV = { PRODUCTION: Mocktail.PRODUCTION, TESTING: Mocktail.TESTING };
        this.reset();
    }

    /**
     * @method isProduction
     * @return {Boolean}
     */
    isProduction() {
        return this.environment === Mocktail.PRODUCTION;
    }

    /**
     * @method resolve
     * @param {Function} actualModule
     * @param {String} [nameRepresentation='']
     * @return {*}
     */
    resolve(actualModule, nameRepresentation = '') {

        if (typeof actualModule !== 'function') {

            // Prevent the user from passing any item that isn't a function/class.
            throw new Error('Mocktail: Method mocktail.resolve only accepts a function.');

        }

        if ((!actualModule.name || actualModule.name === '_class') && !nameRepresentation) {

            // Prevent the user from passing an anonymous function/class.
            throw new Error('Mocktail: Passing anonymous function to mocktail.resolve; use second argument to specify a name.')

        }

        const runtimeDependency = this.modules.get(nameRepresentation || actualModule.name);

        if (!this.isProduction() && typeof runtimeDependency !== 'undefined') {
            return runtimeDependency;
        }

        return actualModule;

    }

    /**
     * @method mock
     * @param {Array} modules
     * @return {*}
     */
    mock(...modules) {

        if (modules.length === 0 || typeof modules[0] === 'undefined') {

            // Prevent the developer from shooting themselves in the foot.
            throw new Error('Mocktail: You must supply at least one component to the mocktail.mock method.');

        }

        const mockedModule = (typeof modules[1] !== 'undefined' ? modules[1] : modules[0]);
        return this.isProduction() ? modules[0] : mockedModule;

    }

    /**
     * @method env
     * @param {String} [name=null]
     * @return {String|void}
     */
    env(name = null) {

        if (name === null) {
            return this.environment;
        }

        if (!~[Mocktail.PRODUCTION, Mocktail.TESTING].indexOf(name)) {

            // Ensure the developer is passing the correct values to avoid disappointment.
            throw new Error('Mocktail: Environment must be either mocktail.ENV.PRODUCTION or mocktail.ENV.TESTING.');

        }

        this.environment = name;

    }

    /**
     * @method inject
     * @param {String} actual
     * @param {*} mock
     * @return {void}
     */
    inject(actual, mock) {

        if (typeof actual !== 'string') {
            throw new Error('Mocktail: You must supply the function name of the object to mock.');
        }

        this.modules.set(actual, mock);

    }

    /**
     * @method reset
     * @return {void}
     */
    reset() {
        this.environment = Mocktail.PRODUCTION;
    }

}

const mocktail = new Mocktail();
const ENV      = mocktail.ENV;
const resolve  = ::mocktail.resolve;
const mock     = ::mocktail.mock;
const env      = ::mocktail.env;
const inject   = ::mocktail.inject;
const reset    = ::mocktail.reset;

// Export all of the interesting components from the Mocktail module.
export {mocktail as default, ENV, resolve, mock, env, inject, reset};
