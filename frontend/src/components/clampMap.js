import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
// import ClampMarker from './marker'
import ClampMarkerList from './markerList'
import { getDistanse, createURL, getClampRecords } from "./utils"

export let apiToken = "";
export default class SimpleExample extends Component {


    //マップの描画範囲が変わったときの処理
    handleMoveEnd = async event => {
        const map = event.target // 地図
        //中心座標を取得
        const pos = map.getCenter();
        const lat = Math.floor(pos.lat * 10000) / 10000
        const lng = Math.floor(pos.lng * 10000) / 10000
        // console.log(lat, lng);
        //中心からの距離を取得
        let dist = getDistanse(map)
        // console.log(dist);
        //url作成
        let url = createURL(lng, lat, dist)
        // クランプの情報を取得してclampsの値を更新する
        const newClamps = await getClampRecords(url, apiToken)
        this.props.setClampsFunc(newClamps)
        console.log(newClamps);
    }

    render() {
        return (
            < Map
                center={this.props.position}
                onmoveend={this.handleMoveEnd}
                zoom={this.props.zoom} >
                <TileLayer
                    attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
                    url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
                />
                {/* <ClampMarker position={this.props.position} /> */}
                <ClampMarkerList 
                    clamps={this.props.clamps} 
                    pushMarkerElementFunc={this.props.pushMarkerElementFunc}
                    PopupMarkerIndex={this.props.PopupMarkerIndex}
                />
            </Map >
        )
    }
}