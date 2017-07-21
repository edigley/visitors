import Input from "../../../app/components/Form/Input";
import { expect } from "chai";
import { mount } from "enzyme";
import React from "react";
import sinon from "sinon";

describe("<Input />", () => {

    const props = {id: "test-id"};
    const valueSelector = `#${props.id}`;
    const activeValueSelector = `#${props.id}-active-value`;
    
    beforeEach( () => {
        props.automatic = false;
        props.activeValue = null;
        props.input = {};
        props.input.value = "";
        props.input.onChange = sinon.spy();
        props.input.onBlur = sinon.spy();
    });

    it("should mount without any issues", () => {
        const wrapper = mount(<Input {...props} />);
        expect(wrapper).to.exist;
        const input = wrapper.find(valueSelector);
        expect(input.node).to.exist;
    });

    it("should mount without active value", () => {
        const wrapper = mount(<Input {...props} />);
        const input = wrapper.find(valueSelector);
        const inputActiveValue = wrapper.find(activeValueSelector);
        expect(input.node).to.exist;
        expect(inputActiveValue.node).to.not.exist;
        expect(input.props().value).to.eql("");
    });

    it("should mount with active value", () => {
        props.activeValue = "Actual Value";
        const wrapper = mount(<Input {...props} />);
        const input = wrapper.find(valueSelector);
        const inputActiveValue = wrapper.find(activeValueSelector);
        expect(input.node).to.exist;
        expect(inputActiveValue.node).to.exist;
        expect(input.props().value).to.eql("");
        expect(inputActiveValue.props().value).to.eql(props.activeValue);
    });

    it("should allow automatic value", () => {
        props.automatic = true;
        props.automaticValue = "Auto Calculated Value";
        const wrapper = mount(<Input {...props} />);
        const input = wrapper.find(valueSelector);
        const inputActiveValue = wrapper.find(activeValueSelector);
        expect(input.node).to.exist;
        expect(inputActiveValue.node).to.not.exist;
        expect(input.props().value).to.eql(props.automaticValue);
    });

    it("should allow automatic value and active value", () => {
        props.automatic = true;
        props.automaticValue = "Auto Calculated Value";
        props.activeValue = "Actual Value";
        const wrapper = mount(<Input {...props} />);
        const input = wrapper.find(valueSelector);
        const inputActiveValue = wrapper.find(activeValueSelector);
        expect(input.node).to.exist;
        expect(inputActiveValue.node).to.exist;
        expect(input.props().value).to.eql(props.automaticValue);
        expect(inputActiveValue.props().value).to.eql(props.activeValue);
    });

});