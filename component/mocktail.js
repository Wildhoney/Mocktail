/**
 * @module Mocktail
 * @author Adam Timberlake
 * @see https://github.com/Wildhoney/Mocktail.js
 */
export default class {

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
        this.environment = PRODUCTION;
    }

    /**
     * @method resolve
     * @param {Array} modules
     * @return {*}
     */
    resolve(...modules) {
        return (this.environment === TESTING) ? modules[0] : modules[1];
    }

    /**
     * @method env
     * @param {String} name
     * @return {void}
     */
    env(name) {

        if (!~[PRODUCTION, TESTING].indexOf(name)) {

            // Ensure the developer is passing the correct values to avoid disappointment.
            throw new Error('Mocktail.js: Environment must be either Mocktail.PRODUCTION or Mocktail.TESTING.');

        }

        this.environment = name;

    }

}
