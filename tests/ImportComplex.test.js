import bootstrap from './test-utils/Bootstrap';
import colours   from './test-utils/project/Colours';

describe('Mocktail: Import Complex', () => {

    it('Should be able to import the mocked Request object inside of Colours;', () => {
        expect(colours.getRequestObject().name).toEqual('AuthenticationMock');
    });

});
