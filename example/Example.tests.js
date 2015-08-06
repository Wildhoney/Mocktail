import _ from './BootstrapTests';
import Example from './Example';

describe('Example', () => {

    it('Give me ExampleMock', () => {
        expect(Example.name).toEqual('ExampleMock');
    });

});
