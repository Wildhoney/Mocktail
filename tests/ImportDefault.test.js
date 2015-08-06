import _              from './test-utils/Bootstrap';
import Authentication from './test-utils/exports/Default';

describe('Mocktail: Import Default', () => {

    it('Should be able to import the default mock object;', () => {
        expect(Authentication.name).toEqual('AuthenticationMock');
    });

});
