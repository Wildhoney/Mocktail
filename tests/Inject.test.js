import {resolve} from '../component/mocktail';
import                './test-utils/Bootstrap';
import                './test-utils/Mocks';
import Request   from './test-utils/exports/Inject';

describe('Mocktail: Dependency Injection', () => {

    it('Should be able to inject a custom mock not used by the component;', () => {
        expect(Request.name).toEqual('RequestMock');
    });

    it('Should be able to throw an exception when user passes a non-function', () => {
        const message = 'Mocktail: Method mocktail.resolve only accepts a function.';
        expect(() => resolve('Adam')).toThrow(new Error(message));
    });

    it('Should be able to notify the developer when passing an anonymous function/class;', () => {
        const message = 'Mocktail: Passing anonymous function to mocktail.resolve; use second argument to specify a name.';
        expect(() => resolve(function() {})).toThrow(new Error(message));
        expect(() => resolve(class {})).toThrow(new Error(message));
    });

});
