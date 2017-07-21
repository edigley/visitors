import React from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {FormGroup, ControlLabel} from "react-bootstrap";

import Renderer from "./Renderer";

const FormField = (field) => {
    return (
            <FormGroup>
                <ControlLabel htmlFor={field.name}>{field.label}</ControlLabel>
                <Field
                    name={field.name}
                    id={field.name}
                    className="u-full-width"
                    component={Renderer}
                    {...field}
                />
            </FormGroup> 
        )
}

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default FormField;
