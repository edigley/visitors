import React from "react";
import PropTypes from "prop-types";
import {danger} from "../../utils/colors";
import {Button} from "react-bootstrap";

class Toggle extends React.Component { 
  
    constructor(props) {
        super(props);
        this.state = {value: ""};
    }

    toggleOn = (...data) => {
        this.setState({value: "ON"})
    }

    toggleOff = (...data) => {
        this.setState({value: "OFF"})
    }

    render() {
        return (
                <div>
                    <Button bsStyle={this.props.specific.onstyle}              
                            onClick={()=>{this.toggleOn();this.props.input.onChange("ON")}}
                            disabled={this.state.value=="ON"}>
                            { this.props.specific.on }
                    </Button>
                    <Button bsStyle={this.props.specific.offstyle}
                            onClick={()=>{this.toggleOff();this.props.input.onChange("OFF")}}
                            disabled={this.state.value=="OFF"}>
                            { this.props.specific.off }
                    </Button>
                </div>
            );
    }
}

Toggle.propTypes = {
    input: PropTypes.object.isRequired
};

export default Toggle;