import AmountOfTime from "../../../app/components/Form/AmountOfTime";
import { expect } from "chai";
import { mount, shallow } from "enzyme";
import React from "react";
import sinon from "sinon";

describe("<AmountOfTime />", () => {

    const props = {id: "test-item"};
    const valueSelector = `#${props.id}-input`;
    const unitSelector = `#${props.id}-select`;
    
    beforeEach( () => {
        props.input = {
            value: {
                amount: "",
                unit: ""
            },
            onChange: () => {}
        };
        props.units = [ 
            {code:"DAYS", label:"Days"},
            {code:"YEARS", label:"Years"},
        ];
        props.showEmptyOption = true;
        props.defaultUnit = "";

    });

    it("should mount without any issues", () => {

        // should mount for well defined props
        let wrapper = shallow(<AmountOfTime {...props} />);
        expect(wrapper).to.exist;

        // should mount without props
        wrapper = shallow(<AmountOfTime />);
        expect(wrapper).to.exist;

        // should mount with initial values defined as null
        props.input.onChange = undefined;
        props.input.value.amount = null;
        props.input.value.unit = null;
        wrapper = shallow(<AmountOfTime />);
        expect(wrapper).to.exist;

        // should mount with initial value defined as null
        props.input.value = null;
        wrapper = shallow(<AmountOfTime {...props} />);
        expect(wrapper).to.exist;

        // should mount with units defined as null
        props.units = null;
        wrapper = shallow(<AmountOfTime {...props} />);
        expect(wrapper).to.exist;

        // should mount with units undefined
        props.units = undefined;
        wrapper = shallow(<AmountOfTime {...props} />);
        expect(wrapper).to.exist;

        // should mount with props undefined
        const nullProps = null;
        wrapper = shallow(<AmountOfTime {...nullProps} />);
        expect(wrapper).to.exist;

        // should mount without empty option for units undefined
        props.units = undefined;
        props.showEmptyOption = false;
        wrapper = shallow(<AmountOfTime {...props} />);
        expect(wrapper).to.exist;

    });

    it("should mount with one input and one select", () => {
        const wrapper = mount(<AmountOfTime {...props} />);
        expect(wrapper.find(valueSelector).node).to.exist;
        expect(wrapper.find(unitSelector).node).to.exist;
    });

    it("should mount with all the options for unit selections", () => {
        props.showEmptyOption = false;
        let wrapper = mount(<AmountOfTime {...props} />);
        expect(wrapper.find(unitSelector).node).to.exist;
        let nOptions = props.units.length;
        expect(wrapper.find("option")).to.have.length(nOptions);

        props.showEmptyOption = true;
        wrapper = mount(<AmountOfTime {...props} />);
        expect(wrapper.find(unitSelector).node).to.exist;
        nOptions = props.units.length + 1;
        expect(wrapper.find("option")).to.have.length(nOptions);

    });

    it("should allow default options", () => {
        // default empty option
        props.showEmptyOption = true;
        props.defaultUnit = "";
        let wrapper = mount(<AmountOfTime {...props} />);
        let instance = wrapper.instance();
        expect(instance.state).to.eql({
            amount:"",
            unit:props.defaultUnit
        });

        // default empty as YEARS
        props.showEmptyOption = false;
        props.defaultUnit = "YEARS";
        wrapper = mount(<AmountOfTime {...props} />);
        instance = wrapper.instance();
        expect(instance.state).to.eql({
            amount:"",
            unit:props.defaultUnit
        });

    });

    it("should mount without any issues when passed input property value", () => {
        props.input.value.amount = 2;
        props.input.value.unit = "DAYS";
        
        const wrapper = mount(<AmountOfTime {...props} />);
        expect(wrapper).to.exist;
        const input = wrapper.find(valueSelector);
        expect(input.props().value).to.eql(2);
        const unit = wrapper.find(unitSelector);
        expect(unit.props().value).to.eql("DAYS");
    });

    it("should have a few internals methods", () => {
        props.id = "test-id";
        const wrapper = mount(<AmountOfTime {...props} />);
        const instance = wrapper.instance();
        props.input.value = null;
        expect(instance.update).to.exist;
        expect(instance.update).to.be.a("function");
        expect(instance.handleOnValueDefinition).to.exist;
        expect(instance.handleOnValueDefinition).to.be.a("function");
        expect(instance.handleOnUnitSelection).to.exist;
        expect(instance.handleOnUnitSelection).to.be.a("function");
    });


    it("should call update/callback handlers only when necessary", () => {
        props.input.onChange = sinon.spy();
        props.onChangeCallback = sinon.spy();
        const wrapper = mount(<AmountOfTime {...props} />);
        const instance = wrapper.instance();
        const spy1 = props.input.onChange;
        const spy2 = props.onChangeCallback;

        let call=1;
        instance.update({amount:null,unit:null});
        expect(spy1.callCount).to.equal(call);
        expect(spy1.getCalls()[call-1].args).to.eql([null]);
        expect(spy2.callCount).to.equal(call);
        expect(spy2.getCalls()[call-1].args).to.eql([null]);

        call++;
        instance.update({amount:12,unit:null});
        expect(spy1.callCount).to.equal(call);
        expect(spy1.getCalls()[call-1].args).to.eql([null]);
        expect(spy2.callCount).to.equal(call);
        expect(spy2.getCalls()[call-1].args).to.eql([null]);

        call++;
        instance.update({amount:null,unit:"YEARS"});
        expect(spy1.callCount).to.equal(call);
        expect(spy1.getCalls()[call-1].args).to.eql([null]);
        expect(spy2.callCount).to.equal(call);
        expect(spy2.getCalls()[call-1].args).to.eql([null]);

        call++;
        instance.update({amount:"",unit:"YEARS"});
        expect(spy1.callCount).to.equal(call);
        expect(spy1.getCalls()[call-1].args).to.eql([null]);
        expect(spy2.callCount).to.equal(call);
        expect(spy2.getCalls()[call-1].args).to.eql([null]);    

        call++;
        instance.update({amount:5,unit:""});
        expect(spy1.callCount).to.equal(call);
        expect(spy1.getCalls()[call-1].args).to.eql([null]);
        expect(spy2.callCount).to.equal(call);
        expect(spy2.getCalls()[call-1].args).to.eql([null]);

        call++;
        instance.update({amount:"",unit:""});
        expect(spy1.callCount).to.equal(call);
        expect(spy1.getCalls()[call-1].args).to.eql([null]);
        expect(spy2.callCount).to.equal(call);
        expect(spy2.getCalls()[call-1].args).to.eql([null]);

        const temporalValue = {amount:25,unit:"DAYS"};
        call++;
        instance.update(temporalValue);
        expect(spy1.callCount).to.equal(call);
        expect(spy1.getCalls()[call-1].args).to.eql([temporalValue]);
        expect(spy2.callCount).to.equal(call);
        expect(spy2.getCalls()[call-1].args).to.eql([temporalValue]);

    });

    it("should properly handle amount definition", () => {
        const wrapper = mount(<AmountOfTime {...props} />);
        const instance = wrapper.instance();
        expect(instance.state.amount).to.eql("");
        expect(instance.state.unit).to.eql("");
        instance.handleOnValueDefinition({target:{value:12}});
        expect(instance.state.amount).to.eql(12);
        expect(instance.state.unit).to.eql("");
    });

    it("should properly handle unit selection", () => {
        const wrapper = mount(<AmountOfTime {...props} />);
        const instance = wrapper.instance();
        expect(instance.state.amount).to.eql("");
        expect(instance.state.unit).to.eql("");
        instance.handleOnUnitSelection({target:{value:"DAYS"}});
        expect(instance.state.amount).to.eql("");
        expect(instance.state.unit).to.eql("DAYS");
    });

    it("should properly handle amount/unit selection", () => {
        const wrapper = mount(<AmountOfTime {...props} />);
        const instance = wrapper.instance();
        expect(instance.state.amount).to.eql("");
        expect(instance.state.unit).to.eql("");
        instance.handleOnValueDefinition({target:{value:12}});
        instance.handleOnUnitSelection({target:{value:"DAYS"}});
        expect(instance.state.amount).to.eql(12);
        expect(instance.state.unit).to.eql("DAYS");
    });

    it("should properly handle default unit definition", () => {
        props.unit = "DAYS"
        const wrapper = mount(<AmountOfTime {...props} />);
        const instance = wrapper.instance();
        expect(instance.state.amount).to.eql("");
        expect(instance.state.unit).to.eql("");
        instance.handleOnValueDefinition({target:{value:12}});
        instance.handleOnUnitSelection({target:{value:"YEARS"}});
        expect(instance.state.amount).to.eql(12);
        expect(instance.state.unit).to.eql("DAYS");
    });

    it("should properly behave without an input prop", () => {
        delete props.input;
        delete props.unit;
        const wrapper = mount(<AmountOfTime {...props} />);
        const instance = wrapper.instance();
        expect(instance.state).to.eql({amount:"",unit:""});
        instance.handleOnValueDefinition({target:{value:12}});
        instance.handleOnUnitSelection({target:{value:"YEARS"}});
        expect(instance.state).to.eql({amount:12,unit:"YEARS"});
    });


});