import React from "react";
import PropTypes from "prop-types";
import { getCredentials, DBNavigationContainer } from "tradefinance-entitlement-ui";
import { NotifierContainer } from "common-ui";

class Layout extends Component {

	constructor() {
		super();
		this.state = { showApp: false };
	}

	componentDidMount() {
		getCredentials()
		.then( (response) => {
			if (response) {
				this.props.loadUserRights(response);
				this.setState({ showApp: true });
			}

		})
		.catch(() => this.setState( { showApp: false } ));

	}

	render() {
		const {state: {showApp}} = this;

		if (!showApp) {
			return <div> </div>;
		}
		return (
			<div className="main-content full-height">
				<NotifierContainer allowHTML={true} />
				<DBNavigationContainer />
				<div className="admin-content full-height">
					<div className="content-pane full-height">
						{this.props.children}
					</div>
				</div>
			</div>
		);

	}

}

Layout.propTypes = {
	loadUserRights: PropTypes.func.isRequired
};

export default Layout;