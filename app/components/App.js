import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";

import store from "../store/store";
import Layout from "../containers/LayoutContainer";

import {GenericApp, NotFound} from "common-ui";

import InstrumentDashboard from "../containers/instrument/dashboard/InstrumentDashboard";
import InstrumentForm from "../containers/instrument/form/InstrumentForm";

const history = syncHistoryWithStore(hashHistory, store);

class App extends React.Component {

	constructor() {
		super();
		this.state = { rehydrated: false };
	}

	componentDidMount() {
		persistStore( store, { blacklist: ["i18n","validation","formMetadata","routing"] }, () => {
			this.setState({rehydrated: true});
		});
	}

	render() {

		if (!this.state.rehydrated) {
			return <div>/div>;
		}

		return (
			<Provider store={store}>
				<Router history={history}>
					<IndexRoute component={GenericApp/> 
					<Route name="Dynamic Form Generation" path="/dynamic" component={DynamicFormPage} />
					<Route name="Instrument Dashboard" path="/instruments" component={InstrumentDashboard} />
					<Route name="Instrument" path="/instrument/:id" component={InstrumentForm} />
					<Route name="404" path="/*" component={NotFound} />
				</Router>
			</Provider>
		);
	}

}

export default App;