import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Markers } from '../api/markers.js';

class EventsMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: nextProps.markers
    });
  }

  render() {
    return (
      <ul>
        {this.state.events.map((event) =>
          <li key={event._id}>Event id: {event._id}, Lat:{event.lat}, Lng:{event.lng}</li>
        )}
      </ul>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('markers');

  return {
    markers: Markers.find({}).fetch()
  }
})(EventsMenu);