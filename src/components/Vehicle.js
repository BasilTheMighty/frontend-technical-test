import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import {getVehicle} from '../api';

export default class Vehicle extends Component {

    constructor (props) {
        super(props);

        this.state = {
            vehicle: props.vehicle,
            detail: null
        }
    }

    componentDidMount () {
        getVehicle(this.state.vehicle.url, (resp) => {
            if (resp.err) {
                return this.setState({err: resp.err});
            }
            this.setState({
                detail : resp.data
            });
        });
    }

    render () {
        if (this.state.err) {
            //TODO better error handling
            return <div></div>;
        }
        if (!this.state.detail) {
            return <div></div>;
        }

        var detail = this.state.detail;
        var vehicle = this.state.vehicle;
        var imageUrl = vehicle && vehicle.media.vehicle && vehicle.media.vehicle[0] && vehicle.media.vehicle[0].url;

        if (vehicle && imageUrl) {
            return <Col xs={12} md={6} lg={3} className={"collapse-padding"}>
                <Row className={"bg-white"}>
                    <Col xs={4} md={12} lg={12} className={"collapse-padding"}>
                        <img className={"img-responsive"} src={imageUrl}/>
                    </Col>
                    <Col xs={8} md={12} lg={12} className={"collapse-padding align-text"}>
                        <Row>
                            <Col xs={12} md={12} lg={12}>
                                <h3>{vehicle.name}</h3>
                            </Col>
                            <Col xs={12} md={12} lg={12}>
                                <h4>From {detail.price}</h4>
                            </Col>
                            <Col xs={12} md={12} lg={12}>
                                <h4>{detail.description}</h4>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        }
    }
}