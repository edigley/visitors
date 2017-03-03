import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {Provider} from "react-redux";
import store from "../store/store";
import DynamicFormPage from "./DynamicFormPage";

const history = syncHistoryWithStore(hashHistory, store);

class App extends React.Component {

	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Route name="Dynamic Form Generation" path="/" component={DynamicFormPage} />
				</Router>
			</Provider>
		);
	}

}

export default App;