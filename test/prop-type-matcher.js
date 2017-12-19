import PropTypes from 'prop-types';
import PropTypesMatcher from '../index';
import ReactPropTypesSecret from 'prop-types/lib/ReactPropTypesSecret';

describe('prop-type-matcher', () => {
    beforeEach(() => jasmine.addMatchers(PropTypesMatcher));

    describe('toBePropType', () => {
        let toBePropTypeMock;
    
        beforeEach(() => {
            toBePropTypeMock = PropTypesMatcher.toBePropType({}, {}).compare;
        });
    
        it('uses prop-types validation to type check', () => {
            const propTypeMock = jasmine.createSpy('propType');
            const value = 'hello';
            expect(value).toBePropType(propTypeMock);
            expect(propTypeMock).toHaveBeenCalledWith({ value }, 'value', 'toBePropType', value, null, ReactPropTypesSecret);
        });
    
        it('passes if no error is returned from propType', () => {
            const propTypeMock = jasmine.createSpy().and.returnValue(null);
            const value = 'hello';
            expect(value).toBePropType(propTypeMock);
        });
    
        it('fails if an error is returned from propType', () => {
            const propTypeMock = jasmine.createSpy().and.returnValue(new Error('propType error'));
            expect('hello').not.toBePropType(propTypeMock);
        });
    
        it('throws propType error message on failure', () => {
            const error = new Error('propType error');
            const propTypeMock = jasmine.createSpy().and.returnValue(error);
            const { pass, message } = toBePropTypeMock('hello', propTypeMock);
            expect(pass).toBeFalsy();
            expect(message).toEqual(error.message);
        });
    });

    describe('toBeValidPropTypes', () => {
        let toBeValidPropTypesMock;

        beforeEach(() => {
            toBeValidPropTypesMock = PropTypesMatcher.toBeValidPropTypes({}, {}).compare;
        });

        it('uses prop-types validation to type check', () => {
            const values = { 0: 'hello', 1: 'world' };
            const propTypesMock = {
                0: jasmine.createSpy(),
                1: jasmine.createSpy(),
            };

            expect(values).toBeValidPropTypes(propTypesMock);
            expect(propTypesMock[0]).toHaveBeenCalledWith(values, '0', 'toBeValidPropTypes', values['0'], null, ReactPropTypesSecret);
            expect(propTypesMock[1]).toHaveBeenCalledWith(values, '1', 'toBeValidPropTypes', values['1'], null, ReactPropTypesSecret);
        });

        it('passes if no error is returned from propType', () => {
            const values = { 0: 'hello', 1: 'world' };
            const propTypesMock = {
                0: jasmine.createSpy().and.returnValue(null),
                1: jasmine.createSpy().and.returnValue(null),
            };
            expect(values).toBeValidPropTypes(propTypesMock);
        });

        it('fails if an error is returned from propType', () => {
            const values = { 0: 'hello', 1: 'world' };
            const propTypesMock = {
                0: jasmine.createSpy().and.returnValue(null),
                1: jasmine.createSpy().and.returnValue(new Error()),
            };
            expect(values).not.toBeValidPropTypes(propTypesMock);
        });

        it('throws propType error message on failure', () => {
            const error = new Error('my custom error');
            const values = { 0: 'hello', 1: 'world' };
            const propTypesMock = {
                0: jasmine.createSpy().and.returnValue(null),
                1: jasmine.createSpy().and.returnValue(error),
            };
            const { pass, message } = toBeValidPropTypesMock(values, propTypesMock);
            expect(pass).toBeFalsy();
            expect(message).toEqual(error.message);
        });

        it('doesn\' throw error if value key/value pair is missing from propTypes', () => {
            const values = {
                id: '23123',
                count: 10,
            };
            const propTypes = {
                id: PropTypes.string,
            };
            const { pass, message } = toBeValidPropTypesMock(values, propTypes);
            expect(pass).toBeTruthy();
            expect(message).not.toBeDefined(); 
        });
    });
});

