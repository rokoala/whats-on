import React, { Component } from 'react';
import EventsMap from './EventsMap.jsx';
import EventsMenu from './EventsMenu.jsx';

const App = props => {
    return (
        <div>
            <header>
                <h1>WhatsOn</h1>
            </header>
            <div className="container">
                <div className="markerMenu">
                    <EventsMenu />
                </div>
                <div className="mapContainer">
                    <EventsMap />
                </div>
            </div>
        </div>
    )

}

export default App;