import mocktail from '../component/mocktail';

describe('Mocktail: Export', () => {

    it('Should be able to export the entire module as default;', () => {

        expect(typeof mocktail.resolve).toBe('function');
        expect(typeof mocktail.mock).toBe('function');
        expect(typeof mocktail.stub).toBe('function');
        expect(typeof mocktail.env).toBe('function');
        expect(typeof mocktail.reset).toBe('function');
        expect(typeof mocktail.ENV).toBe('object');

    });

});
