import React from "react";
import PropTypes from "prop-types";
import {FormControl} from "react-bootstrap";
import {danger} from "../../utils/colors";

import Input from "./Input";
import DatePicker from "./DatePicker";
import Toggle from "./Toggle";
import Select from "./Select";
import AmountOfTime from "./AmountOfTime";

export const FORM_COMPONENTS = {
    "text": Input,
    "date": DatePicker,
    "toggle": Toggle,
    "select": Select,
    "amountOfTime": AmountOfTime
};   	

class Renderer extends React.Component { 
  
    constructor(props) {
        super(props);
    }

    render() {
    	let CustomComponent=FORM_COMPONENTS[this.props.type];
        return (
            <div>
                <CustomComponent {...this.props} />
                { 
                    this.props.meta.touched 
                    && this.props.meta.error 
                    && <div style={{color: "white", backgroundColor: danger}}>
                        {this.props.meta.error}
                        </div> 
                }
            </div>
        );
    }
}

Input.propTypes = {
    type: PropTypes.string.isRequired
};

export default Renderer;

