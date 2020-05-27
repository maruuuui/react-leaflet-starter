import React, { Component } from 'react'
import { LayerGroup } from 'react-leaflet'
import ClampMarker from './marker'
export default class SimpleExample extends Component{
    // markers = []
    // bindMarker = (ref) => {
    //     if (ref){
    //         this.markers.push(ref.leafletElement)
            
    //     }
    // }
    // componentDidUpdate(){
    //     console.log(this.markers);
    // }

    render() {
        const clamps = this.props.clamps
        const Markers = clamps.map((clamp) =>
            <ClampMarker 
                clampData={clamp} 
                position={[clamp.point.coordinates[1], clamp.point.coordinates[0]]} 
                key={clamp.id} 
                PopupMarkerIndex={this.props.PopupMarkerIndex}
                pushMarkerElementFunc={this.props.pushMarkerElementFunc}
            />
        );


        return (
            <LayerGroup>
                {Markers}
            </LayerGroup>
        )
    }
}
