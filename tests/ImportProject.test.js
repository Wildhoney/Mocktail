import              './test-utils/Bootstrap';
import colours from './test-utils/project/Colours';

describe('Mocktail: Import Project', () => {

    it('Should be able to import the stubed Request object inside of Colours;', () => {
        expect(colours.getRequestObject().name).toEqual('AuthenticationMock');
    });

});
