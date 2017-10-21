import React, {Component} from 'react';
import {getData} from '../api';
import Vehicle from './Vehicle'
import {Grid, Row} from 'react-bootstrap';
import _ from 'lodash';

export default class VehicleList extends Component {

    constructor (props) {
        super(props);

        this.state = {
            data: null
        }
    }

    componentDidMount () {
        getData((resp) => {
            if (resp.err) {
                return this.setState({err: resp.err});
            }
            var data = resp.data;
            _.each(data.vehicles, (vehicle) => {
                vehicle.media = _.groupBy(vehicle.media, "name");
            });
            this.setState({data: resp.data});
        });
    }

    render () {
        if (this.state.err) {
            // TODO better error handling
            return (<h1>Oops!</h1>);
        }
        if (!this.state.data) {
            return (<h1>Loading...</h1>);
        }
        var vehicles = this.state.data.vehicles;
        return (
            <div>
                <Grid fluid={true}>
                    <Row className='show-grid'>
                        {_.map(vehicles, (vehicle) => {
                            return <Vehicle key={vehicle.id} vehicle={vehicle}/>
                        })}
                    </Row>
                </Grid>
            </div>
        )
    }
}