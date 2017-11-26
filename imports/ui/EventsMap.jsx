import React from 'react';
import MyMap from './MyMap.jsx';
import { Marker } from 'react-google-maps';

class EventsMap extends React.PureComponent {
    state = {
        isMarkerShown: true,
        markers:[]
    }

    componentDidMount() {}

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false });
    }

    handleMapClick = (props) =>{
        var marker = <Marker key={this.state.markers.length} position={{ lat: props.latLng.lat(), lng: props.latLng.lng() }} />;
        
        this.setState({
            markers:[...this.state.markers, marker]
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

export default EventsMap;