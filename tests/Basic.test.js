import {resolve, reset, env, ENV} from '../component/mocktail';
import _                          from './test-utils/Bootstrap';
import Authentication             from './test-utils/modules/Authentication';
import AuthenticationMock         from './test-utils/modules/AuthenticationMock';

afterEach(() => reset());

describe('Mocktail: Basic', () => {

    it('Should be able to resolve the module depending on the environment;', () => {

        env(ENV.PRODUCTION);
        const FirstModule = resolve(Authentication, AuthenticationMock);
        expect(FirstModule.name).toEqual('Authentication');

        env(ENV.TESTING);
        const SecondModule = resolve(Authentication, AuthenticationMock);
        expect(SecondModule.name).toEqual('AuthenticationMock');

    });

    it('Should be able to read and reset the environment to the default', () => {

        env(ENV.TESTING);
        expect(env()).toEqual(ENV.TESTING);

        reset();
        expect(env()).toEqual(ENV.PRODUCTION);

    });

    it('Should be able to always return the actual object unless two objects are supplied;', () => {

        env(ENV.TESTING);
        const FirstModule = resolve(Authentication);
        expect(FirstModule.name).toEqual('Authentication');

        const SecondModule = resolve(true, false);
        expect(SecondModule).toEqual(false);

    });

    it('Should throw an exception if the developer supplies an invalid environment name;', () => {

        const error = 'Mocktail: Environment must be either mocktail.ENV.PRODUCTION or mocktail.ENV.TESTING.';
        expect(() => env('Boo!')).toThrow(new Error(error));

    });

    it('Should throw an exception if the developer supplies zero components to resolve;', () => {

        const error = 'Mocktail: You must supply at least one component to the mocktail.resolve method.';
        expect(() => resolve()).toThrow(new Error(error));

    });

});
