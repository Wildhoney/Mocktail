import bootstrap        from './test-utils/Bootstrap';
import {Authentication} from './test-utils/exports/Explicit';

describe('Mocktail: Import Explicit', () => {

    it('Should be able to import the explicit mock object;', () => {
        expect(Authentication.name).toEqual('AuthenticationMock');
    });

});
