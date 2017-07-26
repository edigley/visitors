import React from "react";
import PropTypes from "prop-types";
import { FormGroup, FormControl, Row, Col, ControlLabel } from "react-bootstrap";
import { isEqual, isEmpty } from "lodash";

class AmountOfTime extends React.Component { 
  
    constructor(props) {
        super(props);

        const initialValue = props.input.value;

        const initialAmount = initialValue ? initialValue.amount || "":"";
        const defaultUnit = props.defaultUnit || "";
        let initialUnit = initialValue ? initialValue.unit : defaultUnit;

        if (!initialUnit && !props.showEmptyOption) {
            initialUnit = defaultUnit || (!isEmpty(props.units) ? props.units[0].code : "");
        }
        
        this.valueModel = {
            amount: initialAmount,
            unit: initialUnit
        };

        this.state = { ...this.valueModel };

        this.handleOnUnitSelection = this.handleOnUnitSelection.bind(this);
        this.handleOnValueDefinition = this.handleOnValueDefinition.bind(this);
        this.update = this.update.bind(this);
    }

    numberNormalizer(input){
        return input;
    }

    numberFormatter(input){
        return input;
    }

    update(newState) {
        let updatedValue = null;
        if (newState.amount && newState.unit) {
            updatedValue = {
                amount: this.numberNormalizer(newState.amount),
                unit: newState.unit
            };
        }
        this.props.input.onChange(updatedValue);
        this.props.onChangeCallback(updatedValue);
    }

    handleOnUnitSelection(event) {
        const newState = {
            ...this.state,
            unit: this.props.unit || event.target.value
        };
        this.setState(newState);
        this.update(newState);
    }

    handleOnValueDefinition(event) {
        const number = this.numberFormatter(event.target.value, this.props.format.digits);
        let newState = {
            ...this.state,
            amount: number
        }
        this.setState(newState);
        this.update(newState);
    }

    renderOptions(units) {
        return ((units || []).map(
            (unit) => 
                <option 
                    value={unit.code ? unit.code : unit} 
                    key={unit.code ? unit.code : unit}
                >
                    {unit.label ? unit.label : unit}
                </option>
            )
        );
    }

    render() {
        const { props: { id, label, units, unit, isReadOnly, showEmptyOption} } = this;

        return (
            <div id={id}>
                <FormGroup>
                    <ControlLabel>{label}</ControlLabel>
                    <Row>
                        <Col xs={6}>
                            <FormControl
                                id={`${id}-input`}
                                value={this.state.amount}
                                componentClass="input"
                                onChange={this.handleOnValueDefinition}
                                disabled={isReadOnly}
                            />
                        </Col>
                        <Col xs={6}>
                            <FormControl
                                id={`${id}-select`}
                                value={unit || this.state.unit}
                                componentClass="select"
                                onChange={this.handleOnUnitSelection}
                                disabled={isReadOnly || !isEmpty(unit)}
                            >
                                {showEmptyOption && <option value=""></option>}
                                {this.renderOptions(units)}
                            </FormControl>
                        </Col>
                    </Row>
                </FormGroup>
            </div>
        );
    }
}

AmountOfTime.propTypes = {
    defaultUnit: PropTypes.string,
    format: PropTypes.shape({
        digits: PropTypes.number
    }),
    id: PropTypes.string,
    input: PropTypes.shape({
        onBlur: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.any.isRequired
    }).isRequired,
    isReadOnly: PropTypes.bool,
    label: PropTypes.string,
    showEmptyOption: PropTypes.bool,
    unit: PropTypes.string,
    units: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            label: PropTypes.string
        })
    ).isRequired,
};

AmountOfTime.defaultProps = {
    defaultUnit: "",
    format: {},
    input: { onChange: () => {} },
    id: "",
    label: "",
    isReadOnly: false,
    showEmptyOption: true,
    unit: "",
    units: [],
    onChangeCallback: () => {}
}

export default AmountOfTime;