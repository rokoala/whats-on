import React from 'react';
import MyMap from './MyMap.jsx';
import { Marker } from 'react-google-maps';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Markers } from '../api/markers.js';

class EventsMap extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isMarkerShown: true,
            markers: []
        }
    }

    createMarkerComponent = (id, lat, lng) => <Marker key={id} position={{ lat: lat, lng: lng }} onClick={(event) => { this.handleMarkerClick(event, { id, lat, lng }) }} />;

    componentWillReceiveProps(nextProps) {
        this.setState({
            markers: nextProps.markers.map((marker) => this.createMarkerComponent(marker._id, marker.lat, marker.lng))
        });
    }

    handleMarkerClick = (event, props) => {
        Meteor.call('marker.remove', props.id);
    }

    handleMapClick = ({ latLng: { lat, lng } }) => {

        let marker = this.createMarkerComponent(this.state.markers.length, lat(), lng());

        Meteor.call('marker.insert', lat(), lng());

        this.setState({
            markers: [...this.state.markers, marker]
        });
    }

    render() {
        return (
            <MyMap
                isMarkersShown={this.state.isMarkerShown}
                onMapClick={this.handleMapClick}
                markers={this.state.markers}
            />
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('markers');

    return {
        markers: Markers.find({}).fetch()
    };
})(EventsMap);