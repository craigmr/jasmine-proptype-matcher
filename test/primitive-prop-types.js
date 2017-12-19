import PropTypes from 'prop-types';
import PropTypesMatcher from '../index';

describe('primitive prop type checking', () => {

    beforeEach(() => {
        jasmine.addMatchers(PropTypesMatcher);
    });
    
    it('PropType.string', () => {
        expect('hello world').toBePropType(PropTypes.string);
        expect(0).not.toBePropType(PropTypes.string);
        expect([]).not.toBePropType(PropTypes.string);
        expect(true).not.toBePropType(PropTypes.string);
        expect({}).not.toBePropType(PropTypes.string);
        expect(Symbol()).not.toBePropType(PropTypes.string);
    });

    it('PropType.array', () => {
        expect([]).toBePropType(PropTypes.array);
        expect('hello world').not.toBePropType(PropTypes.array);
        expect(0).not.toBePropType(PropTypes.array);
        expect(true).not.toBePropType(PropTypes.array);
        expect({}).not.toBePropType(PropTypes.array);
        expect(Symbol()).not.toBePropType(PropTypes.array);
    });

    it('PropType.number', () => {
        expect(0).toBePropType(PropTypes.number);
        expect([]).not.toBePropType(PropTypes.number);
        expect('hello world').not.toBePropType(PropTypes.number);
        expect(true).not.toBePropType(PropTypes.number);
        expect({}).not.toBePropType(PropTypes.number);
        expect(Symbol()).not.toBePropType(PropTypes.number);
    });
});