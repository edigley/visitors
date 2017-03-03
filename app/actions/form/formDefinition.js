import config from "../../config";

import { decamelize } from "../../utils/caseUtils";

export const RULES_GET = "rules/get";
export const ERROR = "error";

export function getRules(formName,formDefinition){
	return () => {
		if (!formName) {
			dispatch({
				type: ERROR,
				payload: "Missing params on call to Action getRules"
			});
			return;
		}
		if(formDefinition){
			const fields = {fields: formDefinition};
			dispatch({
				type: RULES_GET,
				payload: fields,
				formName: formName
			});
		}else{
			config.axios.get(config.api.url.formDefinition + formName)
				.then((data) => {
					dispatch({
						type: RULES_GET,
						payload: data.data,
						formName: formName
					});
				}).catch((error)=>{
					dispatch({
						type: ERROR,
						payload: error
					});
				});
		}
	};
}