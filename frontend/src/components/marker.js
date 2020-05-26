import React, { Component } from 'react'
import { Marker, Popup } from 'react-leaflet'

export default class SimpleExample extends Component {
    handleMouseover = event => {
        //ピンにポインタが触れたときの処理
        const { lat, lng } = event.latlng
        console.log(`Clicked at ${lat}, ${lng}`)
        event.target.openPopup();
    }
    handleClick = event => {
        //ピンがクリックされたときの処理
        alert("")
        event.target.openPopup();
    }

    render() {
        return (
            <Marker
                position={this.props.position}
                onmouseover={this.handleMouseover}
                onclick={this.handleClick} >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
            </Marker>
        )
    }
}