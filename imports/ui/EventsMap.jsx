import { compose, withProps, withStateHandlers, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Markers } from '../api/markers.js';

const EventsMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '550px' }} />,
        mapElement: <div style={{ height: '100%' }} />
    }),
    withHandlers({
        onMapClick: () => ({ latLng: { lat, lng } }) => {
            Meteor.call('marker.insert', lat(), lng());
        },
        onMarkerClick: () => (event, marker) => {
            Meteor.call('marker.remove', marker._id);
        }
    }),
    withScriptjs,
    withGoogleMap
)((props) =>(
    <GoogleMap
        onClick={props.onMapClick}
        defaultZoom={8}
        defaultCenter={{ lat: -23.5489, lng: -46.6388 }}
    >
        {
            props.markers.map((marker) =>
                <Marker key={marker._id} position={{ lat: marker.lat, lng: marker.lng }} onClick={(event) => props.onMarkerClick(event, marker)} />
            )
        }
    </GoogleMap>
    ));

export default withTracker(() => {
    Meteor.subscribe('markers');

    return {
        markers: Markers.find({}).fetch()
    }
})(EventsMap);