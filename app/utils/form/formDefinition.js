export const fields = [
    {
        "name":"identifier",
        "label":"Identifier",
        "type":"text",
        "renderer":"Input",
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
        "renderer":"Input",
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
        "renderer":"DatePicker",
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
        "renderer":"Toggle",
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
        "type":"text",
        "renderer":"Select",
        "specific":{
            "options"  : [ "BRAZIL", "FRANCE", "GERMANY", "IRELAND", "ITALY", "JAPAN", "SPAIN", "UK", "USA", "VENEZUELA" ]
        },
        "validation":[
            {
                "type":"required",
                "value":true      
            }        
        ]
    },
    {
        "name": "amountOfTime",
        "label": "Amount of Time",
        "type": "amountOfTime",
        "renderer": "AmountOfTime",
        "units": [ "DAYS", "MONTHS", "SEMESTERS", "YEARS" ],
        "specific": {},
        "validation": [
            {
                "type":"required",
                "value":true      
            }        
        ]
    },
    {
        "name": "multiLevelSelect",
        "label": "Multi-Level Select",
        "type": "multiLevelSelect",
        "renderer": "MultiLevelSelect",
        "products": {
            lv1Products: {
                1:{id:1, name:"1.1", products: [1,2]}, 
                2:{id:2, name:"1.2", products: [3,4,5]}
            },
            lv2Products: {
                1:{id:1, name:"1.1_2.1", products: [1,2]}, 
                2:{id:2, name:"1.1_2.2", products: [3]}, 
                3:{id:3, name:"1.2_2.3", products: [4,5]}, 
                4:{id:4, name:"1.2_2.4", products: [6]}, 
                5:{id:5, name:"1.2_2.5", products: [7,8,9]}
            },
            lv3Products: {
                1:{id:1, name:"1.1_2.1_3.1", prds_code: 112131, product_long_name: "Import letter Of Credit 112131"}, 
                2:{id:2, name:"1.1_2.1_3.2", prds_code: 112132, product_long_name: "Import letter Of Credit 112132"}, 
                3:{id:3, name:"1.1_2.2_3.3", prds_code: 112233, product_long_name: "Import letter Of Credit 112233"}, 
                4:{id:4, name:"1.2_2.3_3.4", prds_code: 122334, product_long_name: "Import letter Of Credit 122334"}, 
                5:{id:5, name:"1.2_2.3_3.5", prds_code: 122335, product_long_name: "Import letter Of Credit 122335"}, 
                6:{id:6, name:"1.2_2.4_3.6", prds_code: 122436, product_long_name: "Import letter Of Credit 122436"}, 
                7:{id:7, name:"1.2_2.5_3.7", prds_code: 122537, product_long_name: "Import letter Of Credit 122537"}, 
                8:{id:8, name:"1.2_2.5_3.8", prds_code: 122538, product_long_name: "Import letter Of Credit 122538"}, 
                9:{id:9, name:"1.2_2.5_3.9", prds_code: 122539, product_long_name: "Import letter Of Credit 122539"}
            },
        },
        "specific": {},
        "validation": [
            {
                "type":"required",
                "value":true      
            }        
        ]
    }
]