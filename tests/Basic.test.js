import {mock, inject, reset, env, ENV} from '../component/mocktail';
import                                      './test-utils/Bootstrap';
import Authentication                  from './test-utils/modules/Authentication';
import AuthenticationMock              from './test-utils/modules/AuthenticationMock';

afterEach(() => reset());

describe('Mocktail: Basic', () => {

    it('Should be able to resolve the module depending on the environment;', () => {

        env(ENV.PRODUCTION);
        const FirstModule = mock(Authentication, AuthenticationMock);
        expect(FirstModule.name).toEqual('Authentication');

        env(ENV.TESTING);
        const SecondModule = mock(Authentication, AuthenticationMock);
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
        const FirstModule = mock(Authentication);
        expect(FirstModule.name).toEqual('Authentication');

        const SecondModule = mock(true, false);
        expect(SecondModule).toEqual(false);

    });

    it('Should throw an exception if the developer supplies an invalid environment name;', () => {

        const error = 'Mocktail: Environment must be either mocktail.ENV.PRODUCTION or mocktail.ENV.TESTING.';
        expect(() => env('Boo!')).toThrow(new Error(error));
        expect(() => env(0)).toThrow(new Error(error));
        expect(() => env(false)).toThrow(new Error(error));
        expect(() => env(undefined)).not.toThrow(new Error(error));
        expect(() => env(null)).not.toThrow(new Error(error));

    });

    it('Should throw an exception if the developer supplies zero components to resolve;', () => {

        const error = 'Mocktail: You must supply at least one component to the mocktail.mock method.';
        expect(() => mock()).toThrow(new Error(error));
        expect(() => mock(undefined)).toThrow(new Error(error));
        expect(() => mock(0)).not.toThrow(new Error(error));
        expect(() => mock(false)).not.toThrow(new Error(error));
        expect(() => mock(null)).not.toThrow(new Error(error));

    });

    it('Should throw an exception if the developer attempts to set a mock without a label;', () => {

        const error = 'Mocktail: You must supply the function name of the object to mock.';
        expect(() => inject(false, {})).toThrow(new Error(error));
        expect(() => inject(null, {})).toThrow(new Error(error));
        expect(() => inject(undefined, {})).toThrow(new Error(error));
        expect(() => inject({}, {})).toThrow(new Error(error));
        expect(() => inject([], {})).toThrow(new Error(error));
        expect(() => inject('', {})).not.toThrow(new Error(error));
        expect(() => inject('x', {})).not.toThrow(new Error(error));

    });

});
