import                       './test-utils/Setup';
import {Authentication} from './test-utils/exports/Named';

describe('Mocktail: Stub Named', () => {

    it('Should be able to import the named stub object;', () => {
        expect(Authentication.name).toEqual('AuthenticationMock');
    });

});
