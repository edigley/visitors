import React from "react";
import {FormControl} from "react-bootstrap";
import {danger} from "../../utils/colors";

class Input extends React.Component { 
  
    constructor(props) {
        super(props);
        this.state = {value:""};
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(evt) {
        const value = evt.target.value;
        this.setState({value:value});
        this.props.input.onChange(value);
    }

    render() {
        return (
            <div>
                <FormControl value={this.state.value} onChange={this.handleOnChange} />
            </div>
        );
    }
}

Input.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired
};

export default Input;