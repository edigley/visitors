import React, {PropTypes} from "react";
import {connect} from "react-redux";
// import * as formActions from "../actions/form/form";
import Form from "../../components/Form/Form";
import validate from "../../containers/Form/Validation/Validator";

import { fields } from "../../utils/Form/formDefinition";

const mapStateToProps = (state, ownProps) => {
	return {
        fieldData:fields.reduce((data,field)=>{data[field.name]=field; return data},{}),
        fields:fields.map(e=>e.name)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFormSubmit: (values,dispatch) => {
            console.log("handleFormSubmit:values: ", values);
            
        },
        handleFormValidation: (values,fieldData) => {
            console.log("handleFormValidation:Validation result: ", validate(values,fieldData));
            console.log("values:",values);
            console.log("fieldData:",fieldData);
            return validate(values,fieldData);
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);