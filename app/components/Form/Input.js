import React from "react";
import {FormControl} from "react-bootstrap";
import {danger} from "../../utils/colors";

class Input extends React.Component { 
  
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div>
                    <FormControl {...this.props.input} />
                </div>
            );
    }
}

Input.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired
};

export default Input;