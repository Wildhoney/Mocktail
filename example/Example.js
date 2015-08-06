import {resolve} from 'mocktail';

class Example {}
class ExampleMock {}

export default resolve(Example, ExampleMock);
