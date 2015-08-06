import {resolve, reset, env, ENV} from '../component/mocktail';
import bootstrap                  from './test-utils/Bootstrap';
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

});
