export const fields = [
    {
        "name":"identifier",
        "label":"Identifier",
        "type":"text",
        "specific":{},
        "validation":[
            {
                "type":"required",
                "value":true      
            },
            {
                "type":"min",
                "value":4         
            },
            {
                "type":"max",
                "value":10         
            }
        ]
    },
    {
        "name":"email",
        "label":"E-mail",
        "type":"text",
        "specific":{},
        "validation":[
            {
                "type":"required",
                "value":true
            },
            {
                "type":"min",
                "value":8
            },
            {
                "type":"max",
                "value":100
            },
            {
                "type":"regex",
                "value":"^[A-Za-z0-9-.+]+@[A-Za-z0-9-.+]+.[a-z]{2,4}$"
            }
        ]
    },
    {
        "name":"creationDate",
        "label":"Creation date",
        "type":"date",
        "specific":{
            "format":"YYYY-MM-DD"
        },
        "validation":[
            {
                "type":"required",
                "value":true      
            },
            {
                "type":"min",
                "value":"2016-11-01"    //date format must be the same as the input field format
            }            
        ]
    },
    {
        "name":"toggleExample1",
        "label":"Toggle Example 1",
        "type":"toggle",
        "specific":{
            "on"  : "Ready",
            "off" : "Not Ready",
            "active" : false,
            "onstyle"  : "success",
            "offstyle" : "primary"
        },
        "validation":[
            {
                "type":"required",
                "value":true      
            }        
        ]
    },
    {
        "name":"select1",
        "label":"Select Example 1",
        "type":"select",
        "specific":{
            "options"  : [ "BRAZIL", "FRANCE", "GERMANY", "IRELAND", "ITALY", "JAPAN", "SPAIN", "UK", "USA", "VENEZUELA" ]
        },
        "validation":[
            {
                "type":"required",
                "value":true      
            }        
        ]
    }
]