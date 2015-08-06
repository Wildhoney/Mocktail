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
        this.ENV = { PRODUCTION: Mocktail.PRODUCTION, TESTING: Mocktail.TESTING };
        this.reset();
    }

    /**
     * @method resolve
     * @param {Array} modules
     * @return {*}
     */
    resolve(...modules) {

        if (modules.length === 0) {

            // Prevent the developer from shooting themselves in the foot.
            throw new Error('Mocktail: You must supply at least one component to the mocktail.resolve method.');

        }

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

}

const mocktail = new Mocktail();
const ENV      = mocktail.ENV;
const resolve  = ::mocktail.resolve;
const env      = ::mocktail.env;
const reset    = ::mocktail.reset;

// Export all of the interesting components from the Mocktail module.
export { mocktail as default, ENV, resolve, env, reset };
