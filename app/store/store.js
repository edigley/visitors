import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {reducer as formReducer} from "redux-form";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import {hashHistory} from "react-router";
import {routerReducer, routerMiddleware} from "react-router-redux";
import * as immutableStateinvariantMiddleware from "redux-immutable-state-invariant";

import formDefinition from "../reducers/form/formDefinition";

import crashReporter from "./middleware/CrashReporter"

import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from "react-redux-i18n";
import { translations } from "../i18n/i18n.js";

const middleware = (process.env.NODE_ENV == "production")
					? [thunk, /*crashReporter,*/ routerMiddleware(hashHistory)]
					: [thunk, immutableStateinvariantMiddleware.default(), createLogger({collapsed: true}), /*crashReporter,*/ routerMiddleware(hashHistory)];

const store = createStore(
	combineReducers({
		formDefinition,
		routing: routerReducer,
		i18n: i18nReducer,
		form: formReducer
	}), 
	compose(applyMiddleware(...middleware))
);

/*i18n config*/
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale("en"));

export default store;