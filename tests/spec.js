import mocktail           from './test-utils/Mocktail';
import Authentication     from './test-utils/modules/Authentication';
import AuthenticationMock from './test-utils/modules/AuthenticationMock';

describe('Mocktail', () => {

    it('Should be able to resolve the module depending on the environment;', () => {

        const FirstModule = mocktail.resolve(Authentication, AuthenticationMock);
        expect(FirstModule.name).toEqual(Authentication);

        mocktail.env(mocktail.ENV.TESTING);
        const SecondModule = mocktail.resolve(Authentication, AuthenticationMock);
        expect(SecondModule.name).toEqual(AuthenticationMock);

    });

});
