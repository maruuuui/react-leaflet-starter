import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default class SimpleExample extends Component {


    render() {
        return (
            <Marker position={this.props.position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
            </Marker>
        )
    }
}