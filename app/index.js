import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";








if (process.env.NODE_ENV == "production") {
	console.warn("The application is in production mode.");
}
const MOUNT_NODE = document.getElementById("app");

ReactDOM.render(<AppContainer><App/></AppContainer>,MOUNT_NODE);

if (module.hot) {
	module.hor.accept("./components/App", () => {
		console.info("Hot Module for index.js");
		const NewApp = require("./components/App").default;
		ReactDOM.render(<AppContainer><NewApp/></AppContainer>,MOUNT_NODE);
	});
}