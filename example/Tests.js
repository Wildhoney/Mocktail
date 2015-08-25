import './Setup';
import Request from './Request';

describe('Request', () => {

    it('Give me RequestMock', () => {
        expect(Request.name).toEqual('RequestMock');
    });

});
