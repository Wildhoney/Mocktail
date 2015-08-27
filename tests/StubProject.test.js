import              './test-utils/Setup';
import colours from './test-utils/project/Colours';

describe('Mocktail: Stub Project', () => {

    it('Should be able to import the stubed Request object inside of Colours;', () => {
        expect(colours.getRequestObject().name).toEqual('AuthenticationMock');
    });

});
