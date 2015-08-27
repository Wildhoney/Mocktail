import {stub, inject, reset, env, ENV} from '../component/mocktail';
import                                      './test-utils/Setup';
import Authentication                  from './test-utils/modules/Authentication';
import AuthenticationMock              from './test-utils/modules/AuthenticationMock';

afterEach(() => reset());

describe('Mocktail: Basic', () => {

    it('Should be able to mock the module depending on the environment;', () => {

        env(ENV.PRODUCTION);
        const FirstModule = stub(Authentication, AuthenticationMock);
        expect(FirstModule.name).toEqual('Authentication');

        env(ENV.TESTING);
        const SecondModule = stub(Authentication, AuthenticationMock);
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
        const FirstModule = stub(Authentication);
        expect(FirstModule.name).toEqual('Authentication');

        const SecondModule = stub(true, false);
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

    it('Should throw an exception if the developer supplies zero components to mock;', () => {

        const error = 'Mocktail: You must supply at least one component to the mocktail.stub method.';
        expect(() => stub()).toThrow(new Error(error));
        expect(() => stub(undefined)).toThrow(new Error(error));
        expect(() => stub(0)).not.toThrow(new Error(error));
        expect(() => stub(false)).not.toThrow(new Error(error));
        expect(() => stub(null)).not.toThrow(new Error(error));

    });

    it('Should throw an exception if the developer attempts to set a stub without a label;', () => {

        const error = 'Mocktail: You must supply the function name of the object to stub.';
        expect(() => inject(false, {})).toThrow(new Error(error));
        expect(() => inject(null, {})).toThrow(new Error(error));
        expect(() => inject(undefined, {})).toThrow(new Error(error));
        expect(() => inject({}, {})).toThrow(new Error(error));
        expect(() => inject([], {})).toThrow(new Error(error));
        expect(() => inject('', {})).not.toThrow(new Error(error));
        expect(() => inject('x', {})).not.toThrow(new Error(error));

    });

});
