import React, { Component } from 'react';
import EventsMap from './EventsMap.jsx';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <header>
                    <h1>WhatsOn</h1>
                    <EventsMap />
                </header>
            </div>
        )
    }
}