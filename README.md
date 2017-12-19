# Jasmine PropTypes Matcher [![Build Status](https://travis-ci.org/craigmr/jasmine-proptype-matcher.svg?branch=master)](https://travis-ci.org/craigmr/jasmine-proptype-matcher) [![npm version](https://badge.fury.io/js/jasmine-proptype-matcher.svg)](https://badge.fury.io/js/jasmine-proptype-matcher)

Use the type checking power of React [`prop-types`](https://github.com/facebook/prop-types) as a [matcher](https://jasmine.github.io/2.0/introduction.html#section-Matchers) in [Jasmine](https://jasmine.github.io/2.0/).

Frameworks like [Enzyme](https://github.com/airbnb/enzyme) or [Jest](https://github.com/facebook/jest) are great for checking our component props against defined PropTypes. However there is more to your application to just components. Jasmine proptype matcher steps in to assert the other objects and values of your code using your already defined propTypes.

When writing unit tests for your redux actions and reducers use your `Component.propTypes` to make sure your are correctly formating the store's data being sent to your components. Even if you are not using React you can still use PropTypes and Jasmine proptype matcher to create a robust type checking unit tests for any project.

## Install

```
npm i -D jasmine-proptype-matcher
```
## Usage

```
import PropTypes from 'prop-types';
import PropTypesMatcher from 'jasmine-proptype-matcher';

describe('testing with jasmine-proptype-matcher', () => {
    beforeEach(() => jasmine.addMatchers(PropTypesMatcher));

    it('asserts customShape', () => {
        const customShape = PropTypes.shape({
            id: PropTypes.string.isRequired,
            count: PropTypes.number,
        });
        expect({ id: '0987', count: 123 }).toBePropType(customShape);
        expect({ count: 123 }).not.toBePropType(customShape);
        expect({ id: '0987', count: [] }).not.toBePropType(customShape);
    });
});
```
[See more examples.](https://github.com/craigmr/jasmine-proptype-matcher/blob/master/test/examples.js)

## API

Jasmine PropTypes matcher provides two new matchers to Jasmine's expect:

### toBePropType

Checks a single value against and single propType. If prop-type validation fails the expect will fail and report the error from prop-types.
```
expect('hello world').toBePropType(PropTypes.string);
```

```
expect('hello world').toBePropType(PropTypes.number);
// Throws: Invalid hello world `value` of type `string` supplied to `toBePropType`, expected `number`.
```

### toBeValidPropTypes

Checks an object of values against and object of propTypes. If an propType is missing for a key in values, the key is not validated. This follows the smae behavior as [`PropTypes.checkPropTypes`](https://github.com/facebook/prop-types/blob/master/README.md#proptypescheckproptypes)
```
expect({
    id: '123',
    count: 10,
    children: ['456'],
}).toBeValidPropTypes({
    id: PropTypes.string.isRequired,
    count: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.string)
});
```

## Compatibility

### PropTypes v15.6

Jasmine proptype matcher has a peer dependency to [`prop-types`](https://github.com/facebook/prop-types/blob/master/README.md#proptypescheckproptypes) 15.6 or greater. Make sure your project has prop-types installed as a dependency.

### Jasmine v2.8

Jasmine proptype matcher is tested usign jasmine v2.8. Lower versions are untested, results may vary.

```
npm i --save prop-types jasmine
```