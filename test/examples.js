import PropTypes from 'prop-types';
import PropTypesMatcher from '../index';

describe('examples', () => {
    beforeEach(() => jasmine.addMatchers(PropTypesMatcher));

    describe('toBePropType', () => {
        describe('primitve checking', () => {
            it('PropType.string', () => {
                const str = 'hello world';
                expect(str).toBePropType(PropTypes.string);
                expect(str).not.toBePropType(PropTypes.number);
                expect(str).not.toBePropType(PropTypes.array);
                expect(str).not.toBePropType(PropTypes.object);
                expect(str).not.toBePropType(PropTypes.bool);
                expect(str).not.toBePropType(PropTypes.symbol);
            });
        
            it('PropType.array', () => {
                expect([]).toBePropType(PropTypes.array);
                expect([]).not.toBePropType(PropTypes.number);
                expect([]).not.toBePropType(PropTypes.string);
                expect([]).not.toBePropType(PropTypes.object);
                expect([]).not.toBePropType(PropTypes.bool);
                expect([]).not.toBePropType(PropTypes.symbol);
            });
        
            it('PropType.number', () => {
                expect(100).toBePropType(PropTypes.number);
                expect(100).not.toBePropType(PropTypes.array);
                expect(100).not.toBePropType(PropTypes.string);
                expect(100).not.toBePropType(PropTypes.object);
                expect(100).not.toBePropType(PropTypes.bool);
                expect(100).not.toBePropType(PropTypes.symbol);
            });
        
            it('PropType.object', () => {
                expect({}).toBePropType(PropTypes.object);
                expect({}).not.toBePropType(PropTypes.number);
                expect({}).not.toBePropType(PropTypes.string);
                expect({}).not.toBePropType(PropTypes.array);
                expect({}).not.toBePropType(PropTypes.bool);
                expect({}).not.toBePropType(PropTypes.symbol);
            });
        
            it('PropType.bool', () => {
                [true, false].forEach((bool) => {
                    expect(bool).toBePropType(PropTypes.bool);
                    expect(bool).not.toBePropType(PropTypes.number);
                    expect(bool).not.toBePropType(PropTypes.string);
                    expect(bool).not.toBePropType(PropTypes.array);
                    expect(bool).not.toBePropType(PropTypes.object);
                    expect(bool).not.toBePropType(PropTypes.symbol);
                });
            });
        
            it('PropType.symbol', () => {
                expect(Symbol()).toBePropType(PropTypes.symbol);
                expect(Symbol()).not.toBePropType(PropTypes.number);
                expect(Symbol()).not.toBePropType(PropTypes.string);
                expect(Symbol()).not.toBePropType(PropTypes.array);
                expect(Symbol()).not.toBePropType(PropTypes.bool);
                expect(Symbol()).not.toBePropType(PropTypes.object);
            });
        });
    
        it('arrayOf', () => {
            const arrayOfNumbers = PropTypes.arrayOf(PropTypes.number);
            expect([0,1,2,3,4,5]).toBePropType(arrayOfNumbers);
            expect(['0', '1', '2', '3', '4', '5']).not.toBePropType(arrayOfNumbers);
        });
    
        it('objectOf', () => {
            const objectOfStrings = PropTypes.objectOf(PropTypes.string);
            expect({ 0: 'hello', 1: 'world' }).toBePropType(objectOfStrings);
            expect({ 0: 2, 1: 'hello' }).not.toBePropType(objectOfStrings);
        });
    
        it('shape', () => {
            const shapePropType = PropTypes.shape({
                id: PropTypes.string.isRequired,
                count: PropTypes.number,
            });
            expect({ id: '0987', count: 123 }).toBePropType(shapePropType);
            expect({ count: 123 }).not.toBePropType(shapePropType);
            expect({ id: '0987', count: [] }).not.toBePropType(shapePropType);
        });
    });

    describe('toBeValidPropTypes', () => {
        it('checking props against propTypes', () => {
            const props = {
                id: '0987',
                count: 30,
                children: ['312312', '323432'],
                tag: Symbol('test'),
                isLive: true,
                data: {},
            };
            const propTypes = {
                id: PropTypes.string.isRequired,
                count: PropTypes.number,
                children: PropTypes.arrayOf(PropTypes.string),
                tag: PropTypes.symbol,
                isLive: PropTypes.bool,
            };
        });
    });
});