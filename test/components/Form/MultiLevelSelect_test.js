import { expect } from "chai";
import React from "react";
import { shallow, mount } from "enzyme";

import MultiLevelSelect from "../../../app/components/Form/MultiLevelSelect";

describe("<MultiLevelSelect />", () => {

    const props = {};
    const p1={id:1, name:"1.1", products: [1,2]};
    const p2={id:2, name:"1.2", products: [3,4,5]};
    const p11={id:1, name:"1.1_2.1", products: [1,2]};
    const p12={id:2, name:"1.1_2.2", products: [3]};    
    const p23={id:3, name:"1.2_2.3", products: [4,5]};
    const p24={id:4, name:"1.2_2.4", products: [6]};
    const p25={id:5, name:"1.2_2.5", products: [7,8,9]};
    const p111={id:1, name:"1.1_2.1_3.1", prds_code: 112131, product_long_name: "Import letter Of Credit 112131"};
    const p112={id:2, name:"1.1_2.1_3.2", prds_code: 112132, product_long_name: "Import letter Of Credit 112132"};
    const p123={id:3, name:"1.1_2.2_3.3", prds_code: 112233, product_long_name: "Import letter Of Credit 112233"};
    const p234={id:4, name:"1.2_2.3_3.4", prds_code: 122334, product_long_name: "Import letter Of Credit 122334"};
    const p235={id:5, name:"1.2_2.3_3.5", prds_code: 122335, product_long_name: "Import letter Of Credit 122335"};
    const p246={id:6, name:"1.2_2.4_3.6", prds_code: 122436, product_long_name: "Import letter Of Credit 122436"};
    const p257={id:7, name:"1.2_2.5_3.7", prds_code: 122537, product_long_name: "Import letter Of Credit 122537"};
    const p258={id:8, name:"1.2_2.5_3.8", prds_code: 122538, product_long_name: "Import letter Of Credit 122538"};
    const p259={id:9, name:"1.2_2.5_3.9", prds_code: 122539, product_long_name: "Import letter Of Credit 122539"};

    const NON_EXISTENT_LEVEL=0;

    beforeEach( () => {
        props.selectedValues = [];
        props.products = {
            lv1Products: {1:p1, 2:p2},
            lv2Products: {1:p11, 2:p12, 3:p23, 4:p24, 5:p25},
            lv3Products: {1:p111, 2:p112, 3:p123, 4:p234, 5:p235, 6:p246, 7:p257, 8:p258, 9:p259},
        };
    });

    it("should mount without any issues", () => {

        //should mount for well defined props
        let wrapper = shallow(<MultiLevelSelect {...props} />);
        expect(wrapper).to.exist;

        //should mount without props
        wrapper = shallow(<MultiLevelSelect />);
        expect(wrapper).to.exist;

        //should mount props values defined as null
        props.selectedValues = null;
        props.products = null;
        wrapper = shallow(<MultiLevelSelect {...props} />);
        expect(wrapper).to.exist;

        //should mount props values defined as undefined
        props.selectedValues = undefined;
        props.products = undefined;
        wrapper = shallow(<MultiLevelSelect {...props} />);
        expect(wrapper).to.exist;

        //should mount props values defined as undefined
        const nullProps = null;
        wrapper = shallow(<MultiLevelSelect {...nullProps} />);
        expect(wrapper).to.exist;

    });

    it("should provide the expected internal methods", () => {
        const wrapper = mount(<MultiLevelSelect {...props} />);
        const instance = wrapper.instance();
        expect(instance.handleSelect).to.exist;
        expect(instance.handleSelect).to.be.a("function");
        expect(instance.filterSelectedOptions).to.exist;
        expect(instance.filterSelectedOptions).to.be.a("function");
        expect(instance.defineOptions).to.exist;
        expect(instance.defineOptions).to.be.a("function");

    });


});