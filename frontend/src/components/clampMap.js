import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import ClampMarker from './marker'
export default class SimpleExample extends Component {
    handleMoveEnd = () => {
        //マップの描画範囲が変わったときの処理
        // alert("moveend")
    }

    render() {
        return (
            < Map
                center={this.props.position}
                onmoveend={this.handleMoveEnd}
                zoom={this.props.zoom} >
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ClampMarker position={this.props.position} />
            </Map >
        )
    }
}