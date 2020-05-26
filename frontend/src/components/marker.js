import React, { Component } from 'react'
import { Marker, Popup } from 'react-leaflet'

export default class SimpleExample extends Component {
    handleMouseover = event => {
        //ピンにポインタが触れたときの処理
        //ポップアップを開く
        event.target.openPopup();
    }
    handleClick = event => {
        //ピンがクリックされたときの処理
        //ポップアップを開き、自身の推論結果の詳細情報を左のタブに表示する
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