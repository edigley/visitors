import React from "react";
import PropTypes from "prop-types";
import { FormControl } from "react-bootstrap";
import isEqual from "lodash/isEqual";

class Input extends React.Component { 
  
    constructor(props) {
        super(props);
        
        this.valueModel = {
            value: this.props.input.value,
            activeValue: this.props.activeValue
        };

        this.state = { ...this.value };

        this.renderInput = this.renderInput.bind(this);
    }

    renderInput(metadata) {
        const {id, value, input, disabled, style} = metadata;
        const _value = value ? value : input.value;
        return (
            <FormControl
                {...input}
                id={id}
                value={_value}
                componentClass="input"
                disabled={disabled}
                style={style}
            />
        );
    }

    mustShowActiveValue(value, activeValue) {
        return (activeValue != undefined)
            && (activeValue != null)
            && (activeValue != "")
            && !isEqual(value, activeValue);
    }

    render() {
        const { 
            props: { input: {value}, activeValue, activeValueStyle, isReadOnly, automatic, automaticValue}
        } = this;
        const mustShowActiveValue = this.mustShowActiveValue(value, activeValue);
        return (
            <div>
                <div>
                    {this.renderInput({
                        ...this.props,
                        disabled: isReadOnly || automatic,
                        value: (automatic ? automaticValue : value),
                        style: (mustShowActiveValue ? activeValueStyle : {} )
                    })}
                </div>
                <div style={activeValueStyle}>
                    {mustShowActiveValue &&
                        this.renderInput({
                            ...this.props,
                            id: `${this.props.id}-active-value`,
                            value: activeValue,
                            disabled: true

                        })
                    }
                </div>
            </div>
        );
    }
}

Input.propTypes = {
    activeValue: PropTypes.string,
    activeValueStyle: PropTypes.object,
    automatic: PropTypes.bool,
    automaticValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    id: PropTypes.string,
    input: PropTypes.shape({
        onBlur: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.any.isRequired
    }).isRequired,
    isReadOnly: PropTypes.bool,
};

Input.defaultProps = {
    activeValue: "",
    activeValueStyle: {},
    automatic: "",
    id: "",
    isReadOnly: false
}

export default Input;