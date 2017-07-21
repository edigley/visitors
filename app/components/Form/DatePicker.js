import React from "react";
import PropTypes from "prop-types";
import {danger} from "../../utils/colors";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class DatePicker extends React.Component { 
  
    constructor(props) {
        super(props);
    }

    render() {
        let format = this.props.specific.format ? this.props.specific.format : null;
        return (
                <div>
                    <ReactDatePicker
                        className="react-datepicker-datagrid-filter"
                        onBlur={()=>this.props.input.onBlur(this.props.input.value)}
                        selected={this.props.input.value ? moment(this.props.input.value, format) : null }
                        dateFormat={format?format:null}
                        onChange={this.props.input.onChange}
                    />
                </div>
            );
    }
}

DatePicker.propTypes = {
    input: PropTypes.object.isRequired
};


export default DatePicker;