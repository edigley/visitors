//import { camelize } from "../../utils/caseUtils";
import * as actions from "../../actions/form/formDefinition"

const validation = (state = {}, action) => {
	if (!action){
		return state;
	}
	switch(action.type){
		case actions.RULES_GET: {
			const rules = {};
			rules[action.formName] = action.payload;
			return {...state, ...rules};
		}
		case actions.ERROR: {
			return state;
		}
	}
	return state;
};

export default validation;