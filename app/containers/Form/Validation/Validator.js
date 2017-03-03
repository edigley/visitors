import Rules from "./Rules";
import * as types  from "./Types";
import moment from "moment";

const RuleMap=Rules.reduce((ruleArray,rule)=>{ruleArray[rule.name]=rule.method; return ruleArray},{});

export default function validate(values,fieldData){
	let errors={};
	Object.keys(fieldData).map(key=>{
		let evalValue="";
		if(values[key]){
			evalValue=values[key];
		}
		let fieldDataKey=fieldData[key];
		if(evalValue!=null && evalValue!=undefined){
			evalValue=format(evalValue,fieldDataKey);
		}
		let rules=fieldDataKey.validation || [];
		rules.some(rule=>{
			if(rule.type && RuleMap[rule.type]){
				let ruleValue=format(rule.value,fieldDataKey);					
				let validationResult=RuleMap[rule.type](evalValue,ruleValue,rule.value,fieldDataKey.type);
				if(validationResult!=null){
					errors[key]=validationResult;
					return true;	//stop looking for errors on this field
				}
				return false;
			}
		})	
	})
				
	return errors;
}

function format(value,fieldData){
	try{
		switch (fieldData.type) {
		case types.TYPE_DATE: 
			if(fieldData.specific && fieldData.specific.format){
				let date=moment(value, fieldData.specific.format);
				return date.isValid()?+date.utc():null;
			}
		case types.TYPE_TEXT: 
			return value.trim();	
		}
	}catch(e){
		//ignore
	}
	
	return value;
}

