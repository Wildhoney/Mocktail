import _       from './test-utils/Bootstrap';
import __      from './test-utils/Mocks';
import Request from './test-utils/exports/Inject';

describe('Mocktail: Dependency Injection', () => {

    it('Should be able to inject a custom mock not used by the component;', () => {
        expect(Request.name).toEqual('RequestMock');
    });

});
