import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import React, { Component } from 'react';

const MyMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '400px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props => {

        return (
            <GoogleMap
                onClick={props.onMapClick}
                defaultZoom={8}
                defaultCenter={{ lat: -23.5489, lng: -46.6388 }}
            >
                {
                    props.isMarkersShown &&
                    props.markers
                }
            </GoogleMap>
        )
    }
);

export default MyMap;