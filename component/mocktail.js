/**
 * @module Mocktail
 * @author Adam Timberlake
 * @see https://github.com/Wildhoney/Mocktail
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
        this.ENV = { PRODUCTION: Mocktail.PRODUCTION, TESTING: Mocktail.TESTING };
        this.reset();
    }

    /**
     * @method resolve
     * @param {Array} modules
     * @return {*}
     */
    resolve(...modules) {
        return (this.environment === Mocktail.PRODUCTION) ? modules[0] : (modules[1] || modules[0]);
    }

    /**
     * @method env
     * @param {String} [name=null]
     * @return {String|void}
     */
    env(name = null) {

        if (!name) {
            return this.environment;
        }

        if (!~[Mocktail.PRODUCTION, Mocktail.TESTING].indexOf(name)) {

            // Ensure the developer is passing the correct values to avoid disappointment.
            throw new Error('Mocktail: Environment must be either mocktail.ENV.PRODUCTION or mocktail.ENV.TESTING.');

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
export { mocktail as default, ENV, resolve, env, reset };
