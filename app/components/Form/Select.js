import React from "react";
import {danger} from "../../utils/colors";

class Select extends React.Component { 
  
    constructor(props) {
        super(props);
    }

    render() {
        const options = this.props.specific.options;
        return (
                <div>
                    <select selected="" {...this.props.input}>
                        <option value="">Choose here</option>
                        {options.map(c => 
                            <option value={c} key={c}>
                                {c}
                            </option>
                        )}
                    </select>
                </div>
            );
    }

}

Select.propTypes = {
    specific: React.PropTypes.object.isRequired,
    input: React.PropTypes.object.isRequired
};

export default Select;