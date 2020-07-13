import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        // state = {
        //     showingInfoWindow: false,
        //     activeMarker: {},
        //     selectedPlace: {}
        // };
    }


    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: 52.520008,
                    lng: 13.404954
                }}
            />
        );
    }
}

export default GoogleApiWrapper({

})(MapContainer);