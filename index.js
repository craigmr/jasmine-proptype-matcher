// Looks like I'm getting fired 😬
const ReactPropTypesSecret = require('prop-types/lib/ReactPropTypesSecret');

const PropTypesMatcher = {
    toBePropType: (util, customEqualityTesters) => {
        return {
            compare: (value, propType) => {
                const error = propType({ value }, 'value', 'toBePropType', value.toString ? value.toString() : value, null, ReactPropTypesSecret);
                if (error) {
                    return { pass: false, message: error.message };
                } else {
                    return { pass: true };
                }
            },
        };
    },
    toBeValidPropTypes: (util, customEqualityTesters) => {
        return {
            compare: (values, propTypes) => {
                for(let valueName in values) {
                    if (propTypes.hasOwnProperty(valueName)) {
                        const error = propTypes[valueName](values, valueName, 'toBeValidPropTypes', values[valueName], null, ReactPropTypesSecret);
                        if (error) {
                            return { pass: false, message: error.message };
                        }
                    }
                }
                return { pass: true };
            },
        };
    },
};

module.exports = PropTypesMatcher;
