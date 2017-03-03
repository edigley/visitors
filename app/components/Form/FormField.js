import React from "react";
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
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
};

export default FormField;
