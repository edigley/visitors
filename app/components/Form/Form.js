import React from "react";
import { reduxForm } from "redux-form";

import FormField from "./FormField";

const Form = ({fieldData, fields, handleSubmit, handleFormSubmit, dispatch, ...props}) => {
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="content-pane pane-3 form-container">
            {fields.map(
                (fieldName,i) => {
                    let data=fieldData[fieldName];
                    return (
                        <FormField key={i} {...data} />
                    )
                }
            )}
            <button onClick={handleSubmit(handleFormSubmit)}> Submit </button>
        </form>
    );
};

export default reduxForm({ 
    form: "dynamicForm",
    validate: (values, props,...rest) => {
        if(typeof props.handleFormValidation === "function"){
            return props.handleFormValidation(values,props.fieldData);
        }
    }
})(Form);
