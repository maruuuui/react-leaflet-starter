import React, { Component } from 'react'
import { Marker } from 'react-leaflet'

import ClampPopup from "./popup"
export default class SimpleExample extends Component {
    constructor(props){
        super(props)
        this.setLeafletElement = this.setLeafletElement.bind(this)

        this.state={
            markerElement : null,
            pushMarkerElementFunc : props.pushMarkerElementFunc
        }
    }
    
    
    handleMouseover = event => {
        //ピンにポインタが触れたときの処理
        //ポップアップを開く
        console.log(event.target)
        console.log(typeof(event.target));
        event.target.openPopup();
    }
    handleClick = event => {
        //ピンがクリックされたときの処理
        //ポップアップを開き、自身の推論結果の詳細情報を左のタブに表示する
        event.target.openPopup();
    }

    setLeafletElement(marker) {
        if (marker && marker.leafletElement){

            console.log(marker.leafletElement);
            this.state.markerElement = marker.leafletElement
        }
    }
    componentDidMount(){
        this.state.pushMarkerElementFunc(this.state.markerElement)
    }

    render() {
        const clampData = this.props.clampData
        const PopupMarkerIndex = this.props.PopupMarkerIndex
        const popup = <ClampPopup clampMarkerInfo={clampData} />

        return (
            <Marker
                position={[clampData.point.coordinates[1], clampData.point.coordinates[0]]}
                onmouseover={this.handleMouseover}
                onclick={this.handleClick}
                ref={this.setLeafletElement}
            >
                {popup}

            </Marker>
        )
    }
}