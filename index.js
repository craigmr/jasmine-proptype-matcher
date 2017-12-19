// Looks like I'm getting fired 😬
import ReactPropTypesSecret from 'prop-types/lib/ReactPropTypesSecret';

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
};

export default PropTypesMatcher;
