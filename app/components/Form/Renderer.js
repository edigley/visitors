import React from "react";
import PropTypes from "prop-types";
import {FormControl} from "react-bootstrap";
import {danger} from "../../utils/colors";

import Input from "./Input";
import DatePicker from "./DatePicker";
import Toggle from "./Toggle";
import Select from "./Select";
import AmountOfTime from "./AmountOfTime";
import MultiLevelSelect from "./MultiLevelSelect";

export const FORM_COMPONENTS = {
    "Input": Input,
    "DatePicker": DatePicker,
    "Toggle": Toggle,
    "Select": Select,
    "AmountOfTime": AmountOfTime,
    "MultiLevelSelect": MultiLevelSelect
};   	

class Renderer extends React.Component { 
  
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.renderer=="MultiLevelSelect") {
            console.log("this.props.products", this.props.products);
        }
    	let CustomComponent=FORM_COMPONENTS[this.props.renderer];
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

