import React, {Component} from "react";
import PropTypes from "prop-types";

class Layout extends Component {

    constructor(props) {
        super();
        this.state = { showApp: false };
    }

    render() {

        const {state: {showApp}} = this;

        if (!showApp) {
            return <div></div>
        }

        return (
            <div className="main-content full-height">
                <div className="admin-content full-height">
                    <div className="content-pane full-height">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );

    }

}

export default Layout;