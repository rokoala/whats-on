import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Markers = new Mongo.Collection('markers');

if (Meteor.isServer) {
    Meteor.publish('markers', () => Markers.find());
}

Meteor.methods({
    'marker.insert'(lat, lng) {
        Markers.insert({
            lat,
            lng,
            createdAt: new Date()
        })
    },
    'marker.remove'(markerId) {
        check(markerId, String);
        Markers.remove(markerId);
    }
})