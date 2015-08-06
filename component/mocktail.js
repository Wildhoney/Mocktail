/**
 * @module Mocktail
 * @author Adam Timberlake
 * @see https://github.com/Wildhoney/Mocktail.js
 */
const mocktail = new class Mocktail {

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
        this.ENV         = { PRODUCTION: Mocktail.PRODUCTION, TESTING: Mocktail.TESTING };
        this.environment = Mocktail.PRODUCTION;
    }

    /**
     * @method resolve
     * @param {Array} modules
     * @return {*}
     */
    resolve(...modules) {
        return (this.environment === Mocktail.PRODUCTION) ? modules[0] : modules[1];
    }

    /**
     * @method env
     * @param {String} name
     * @return {void}
     */
    env(name) {

        if (!~[Mocktail.PRODUCTION, Mocktail.TESTING].indexOf(name)) {

            // Ensure the developer is passing the correct values to avoid disappointment.
            throw new Error('Mocktail.js: Environment must be either Mocktail.PRODUCTION or Mocktail.TESTING.');

        }

        this.environment = name;

    }

    /**
     * @method reset
     * @return {void}
     */
    reset() {
        this.environment = Mocktail.PRODUCTION;
    }

};

const resolve = ::mocktail.resolve;
const env     = ::mocktail.env;
const reset   = ::mocktail.reset;
const ENV     = mocktail.ENV;

// Export all of the interesting components from the Mocktail module.
export {mocktail as default, ENV, resolve, env, reset };
