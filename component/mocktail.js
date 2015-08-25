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
     * @method mock
     * @param {Function} actualModule
     * @param {String} [nameRepresentation='']
     * @return {*}
     */
    mock(actualModule, nameRepresentation = '') {

        if ((!actualModule.name || actualModule.name === '_class') && !nameRepresentation) {

            // Prevent the user from passing an anonymous function/class.
            throw new Error('Mocktail: Passing anonymous function to mocktail.mock; use second argument to specify a name.')

        }

        const runtimeDependency = this.modules.get(nameRepresentation || actualModule.name);

        if (!this.isProduction() && typeof runtimeDependency !== 'undefined') {
            return runtimeDependency;
        }

        return actualModule;

    }

    /**
     * @method stub
     * @param {Array} modules
     * @return {*}
     */
    stub(...modules) {

        if (modules.length === 0 || typeof modules[0] === 'undefined') {

            // Prevent the developer from shooting themselves in the foot.
            throw new Error('Mocktail: You must supply at least one component to the mocktail.stub method.');

        }

        const stubbedModule = (typeof modules[1] !== 'undefined' ? modules[1] : modules[0]);
        return this.isProduction() ? modules[0] : stubbedModule;

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
     * @param {String} actualName
     * @param {*} stubModule
     * @return {void}
     */
    inject(actualName, stubModule) {

        if (typeof actualName !== 'string') {
            throw new Error('Mocktail: You must supply the function name of the object to stub.');
        }

        this.modules.set(actualName, stubModule);

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
const mock     = ::mocktail.mock;
const stub     = ::mocktail.stub;
const env      = ::mocktail.env;
const inject   = ::mocktail.inject;
const reset    = ::mocktail.reset;

// Export all of the interesting components from the Mocktail module.
export {mocktail as default, ENV, mock, stub, env, inject, reset};
