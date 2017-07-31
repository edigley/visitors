import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
//import { deepClone } from "../../../app/utils/clone";
//import { CommonPropTypes } from "../../../app/utils/propTypes";

class MultiLevelSelect extends Component { 
    constructor(props) {
        super(props);
        const propsClone=props;//const propsClone=deepClone(props);
        console.log("propsClone.products", propsClone.products);
        this.state = { 
            products: propsClone.products,
            lv1Products: propsClone.products ? propsClone.products.lv1Products : [],
            lv2Products: [],
            lv3Products: [],
            selectedLv1Products: [],
            selectedLv2Products: [],
            selectedLv3Products: []
        };
        this.levels = {
            FIRST: 1,
            SECOND: 2,
            THIRD: 3
        };
    }

    filterSelectedOptions(options) {
        const selectedValues=[];
        //to access prototype attribute (_.selected) we must use a for loop, not a filter/map solution
        //the following loop is equivalente to:
        //return option.filter((o) => o.selected).map((o) => parseInt(o.value));
        for (let i=0; i<options.length; i++){
            const element=options[i];
            if(element.selected){
                selectedValues.push(parseInt(element.value));
            }
        }
        return selectedValues;
    }

    defineOptions(parentLevelSelectedValues, parentLevelProducts, currentLevelProducts){
        console.log("parentLevelSelectedValues",parentLevelSelectedValues);
        console.log("parentLevelProducts",parentLevelProducts);
        console.log("currentLevelProducts",currentLevelProducts);
        const parentProductsId = parentLevelSelectedValues.map((k) => parentLevelProducts[k].products)
        const currentLevelOptionsId = [].concat.apply([],parentProductsId);
        const values = Object.keys(currentLevelProducts).map((k)=>currentLevelProducts[k]);
        const currentLevelOptions = values.filter(
            (product) => (currentLevelOptionsId.indexOf(product.id) != -1)
        );
        return currentLevelOptions;
    }

    handleSelect = (level, event) => {
        const options = event.target.children;
        console.log("options",options);
        const { products: {lv1Products, lv2Products, lv3Products} } = this.state;
        let selectedLv1Products, selectedLv2Products, selectedLv3Products;
        switch (level) {
            case this.levels.FIRST:
                console.log("options",options);
                selectedLv1Products = this.filterSelectedOptions(options);
                console.log("selectedLv1Products",selectedLv1Products);
                console.log("parentLevelSelectedValues",selectedLv1Products);
                console.log("parentLevelProducts",lv1Products);
                console.log("currentLevelProducts",lv2Products);
                console.log("this.defineOptions(selectedLv1Products, lv1Products, lv2Products)",this.defineOptions(selectedLv1Products, lv1Products, lv2Products))
                selectedLv3Products = [];
                this.setState(
                    { lv2Products: this.defineOptions(selectedLv1Products, lv1Products, lv2Products) },
                    () => {
                        this.setState({
                            lv2Products: this.defineOptions(selectedLv1Products, lv1Products, lv2Products),
                            lv3Products: [],
                            selectedLv1Products: selectedLv1Products,
                            selectedLv2Products: [],
                            selectedLv3Products: selectedLv3Products
                        });
                    }
                );
                break;
            case this.levels.SECOND:
                selectedLv2Products = this.filterSelectedOptions(options);
                selectedLv3Products = [];
                this.setState(
                    { lv3Products: this.defineOptions(selectedlv2Products,lv2Products, lv3Products) },
                    () => {
                        this.setState({
                            lv3Products: this.defineOptions(selectedlv2Products, 
                                lv2Products, lv3Products),
                            selectedLv2Products: selectedLv2Products,
                            selectedLv3Products: selectedLv3Products
                        });
                    }
                );
                break;
            case this.levels.THIRD:
                selectedLv3Products = this.filterSelectedOptions(options);
                this.setState({
                    selectedLv3Products: selectedLv3Products
                });
                break;
            default:
                return;
        }
        this.defineSelectedValues(selectedLv3Products);
    }

    renderOptions(products) {
        return (
            Object.keys(products).map(
                (c,i) => <option
                            key={i}
                            value={products[c].id}>
                            {products[c].name}
                        </option>
            )
        );
    }

    getSelectedProducts = level => {
        switch (level) {
            case this.levels.FIRST:
                return this.state.selectedLv1Products
            case this.levels.SECOND:
                return this.state.selectedLv2Products
            case this.levels.THIRD:
                return this.state.selectedLv3Products
            default:
                return;
        }
    }

    asArrayOfIds(products){
        return Object.keys(products).map((k)=>products[k]).map(p=>p.id);
    }

    defineSelectedValues = selectedLv3ProductsIds => {
        this.props.onProductsSelected(selectedLv3ProductsIds);
    }

    handleDeselectAllProducts = level => {
        switch (level) {
            case this.levels.FIRST:
                this.setState({
                    lv2Products: [],
                    lv3Products: [],
                    selectedLv1Products: [],
                    selectedLv2Products: [],
                    selectedLv3Products: []
                });
                break;
            case this.levels.SECOND:
                this.setState({
                    lv3Products: [],
                    selectedLv2Products: [],
                    selectedLv3Products: []
                });
                break;
            case this.levels.THIRD:
                this.setState({
                    selectedLv3Products: []
                });
                break;
            default:
                return;
        }
        this.defineSelectedValues([]);
    }

    handleSelectAllProducts = level => {
        const { state: { products: {lv1Products, lv2Products, lv3Products},
            selectedlv1Products, selectedLv2Products }} = this;
        let _lv1Products, _lv3Products, _selectedlv1Products, _selectedLv2Products, _selectedLv3Products;
        switch (level) {
            case this.levels.FIRST:
                _selectedlv1Products = this.asArrayOfIds(lv1Products);
                _lv1Products = this.defineOptions(_selectedlv1Products, lv1Products, lv2Products);
                _selectedlv2Products = this.asArrayOfIds(_lv1Products);
                _lv3Products = this.defineOptions(_selectedlv2Products, lv2Products, lv3Products);
                _selectedlv3Products = this.asArrayOfIds(_lv3Products);
                this.setState({
                    lv2Products: _lv1Products,
                    lv3Products: _lv3Products,
                    selectedLv1Products: _selectedlv1Products,
                    selectedLv2Products: _selectedlv2Products,
                    selectedLv3Products: _selectedlv3Products
                });
                break;
            case this.levels.SECOND:
                _lv1Products = this.defineOptions(selectedlv1Products, lv1Products, lv2Products);
                _selectedlv2Products = this.asArrayOfIds(_lv1Products);
                _lv3Products = this.defineOptions(_selectedlv2Products, lv2Products, lv3Products);
                _selectedlv3Products = this.asArrayOfIds(_lv3Products);
                this.setState({
                    lv2Products: _lv1Products,
                    lv3Products: _lv3Products,
                    selectedLv2Products: _selectedlv2Products,
                    selectedLv3Products: _selectedlv3Products
                });
                break;
            case this.levels.THIRD:
                _lv3Products = this.defineOptions(selectedlv2Products, lv2Products, lv3Products);
                _selectedlv3Products = this.asArrayOfIds(_lv3Products);
                this.setState({
                    lv3Products: _lv3Products,
                    selectedLv3Products: _selectedlv3Products
                });
                break;
            default:
                return;
        }
        this.defineSelectedValues(_selectedlv3Products);
    }

    renderSelect(metadata) {
        const {id, label, labelDeselectAll, labelSelectAll, multiple, level, products} = metadata;
        const selectedProducts = this.getSelectedProducts(level);
        return (
            <FormGroup>            
                <ControlLabel>{label}</ControlLabel>
                <a className="multi-level-select-action-selection"
                    onClick={(e)=>this.handleDeselectAllProducts(level,e)}>{labelDeselectAll}</a>
                <a className="multi-level-select-action-selection"
                    onClick={(e)=>this.handleSelectAllProducts(level,e)}>{labelSelectAll}</a>
                <FormControl
                    id={id}
                    componentClass="select"
                    placeholder="select"
                    size="5"
                    multiple={multiple}
                    value={selectedProducts}
                    onChange={(e)=>this.handleSelect(level,e)}>
                    {this.renderOptions(products)}
                </FormControl>
            </FormGroup>
        );
    }

    render() {
        console.log("this.state", this.state);
        return (
            <div>
                {this.renderSelect({
                    id:"selectProductLevel1",
                    label:this.props.labelLevel1,
                    labelDeselectAll:this.props.labelDeselectAll,
                    labelSelectAll:this.props.labelSelectAll,
                    multiple:true,
                    level:this.levels.FIRST,
                    products:this.state.lv1Products
                })}
                {this.renderSelect({
                    id:"selectProductLevel2",
                    label:this.props.labelLevel2,
                    labelDeselectAll:this.props.labelDeselectAll,
                    labelSelectAll:this.props.labelSelectAll,
                    multiple:true,
                    level:this.levels.SECOND,
                    products:this.state.lv2Products
                })}
                {this.renderSelect({
                    id:"selectProductLevel3",
                    label:this.props.labelLevel3,
                    labelDeselectAll:this.props.labelDeselectAll,
                    labelSelectAll:this.props.labelSelectAll,
                    multiple:true,
                    level:this.levels.THIRD,
                    products:this.state.lv3Products
                })}
            </div>
        );
    }
}

MultiLevelSelect.propTypes = {
    labelDeselectAll: PropTypes.string,
    labelLevel1: PropTypes.string,
    labelLevel2: PropTypes.string,
    labelLevel3: PropTypes.string,
    labelSelectAll: PropTypes.string,
    products: PropTypes.object,
    onProductsSelected: PropTypes.func
};

MultiLevelSelect.defaultProps = {
    labelDeselectAll: "Deselect all",
    labelLevel1: "Level 1",
    labelLevel2: "Level 2",
    labelLevel3: "Level 3",
    labelSelectAll: "Select all",
    products: {
        lv1Products:{},
        lv2Products:{},
        lv3Products:{}
    },
    onProductsSelected: ()=>{}
}

export default MultiLevelSelect;