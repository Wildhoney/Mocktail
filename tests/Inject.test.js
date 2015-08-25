import {mock} from '../component/mocktail';
import                './test-utils/Bootstrap';
import                './test-utils/Mocks';
import Request   from './test-utils/exports/Inject';

describe('Mocktail: Dependency Injection', () => {

    it('Should be able to inject a custom stub not used by the component;', () => {
        expect(Request.name).toEqual('RequestMock');
    });

    it('Should be able to notify the developer when passing an anonymous function/class;', () => {
        const message = 'Mocktail: Passing anonymous function to mocktail.mock; use second argument to specify a name.';
        expect(() => mock(function() {})).toThrow(new Error(message));
        expect(() => mock(class {})).toThrow(new Error(message));
    });

});
