import { strLower } from './helper';

describe('Helper functions', () => {
    describe('strLower(a: any)', () => {
        it('should give a lowercase string for any type and object supplied', () => {
            expect(strLower('Test')).toEqual('test');
            expect(strLower('TeSt')).toEqual('test');
            expect(strLower('TEST')).toEqual('test');
            expect(strLower(null)).toEqual('null');
            expect(strLower(undefined)).toEqual('undefined');
        });
    });
});