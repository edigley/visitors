import React from "react";
import {Grid, Row, Col, PageHeader} from "react-bootstrap";
import FormContainer from "../containers/Form/FormContainer";

const DynamicFormPage = () => (
    <div>
        <Grid fluid className="pane-3 admin-content">
            <Row className="header-fixed-top">
                <Col xs={12} sm={12} md={12} lg={12} style={{backgroundColor:"green"}}>
                </Col>
            </Row>
            <Row className="visitor-form-sections">
                <Col xs={1} sm={1} md={1} lg={1} className="content-pane pane-3 form-container" style={{backgroundColor:"yellow"}}>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                    <FormContainer/>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4} className="content-pane pane-3 form-container" style={{backgroundColor:"blue"}}>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4} className="content-pane pane-3 form-container" style={{backgroundColor:"red"}}>
                </Col>
            </Row>
        </Grid>
    </div>
)

export default DynamicFormPage;