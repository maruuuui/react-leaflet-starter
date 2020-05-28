import React, { Component } from 'react'
import { LayerGroup } from 'react-leaflet'
import ClampMarker from './marker'
export default class SimpleExample extends Component{

    render() {
        const clamps = this.props.clamps
        const Markers = clamps.map((clamp,index) =>
            <ClampMarker 
                key={clamp.id} 
                clampData={clamp} 
                position={[clamp.point.coordinates[1], clamp.point.coordinates[0]]} 
                clampIndex={index} 
                pushMarkerElementFunc={this.props.pushMarkerElementFunc}
                openSideMenuFunc={this.props.openSideMenuFunc}
            />
        );

        return (
            <LayerGroup>
                {Markers}
            </LayerGroup>
        )
    }
}
