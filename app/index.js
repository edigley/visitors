import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

const MOUNT_NODE = document.getElementById("app");

ReactDOM.render(
	<AppContainer>
	<App />
	</AppContainer>,
	MOUNT_NODE
);