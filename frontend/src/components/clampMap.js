import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import ClampMarker from './marker'
import {getDistanse, createURL} from "./utils"

export let clamps = [];
export let apiToken = "";
export default class SimpleExample extends Component {

    //マップの描画範囲が変わったときの処理
    handleMoveEnd = event => {
        const map = event.target // 地図
        //中心座標を取得
        const pos = map.getCenter();
        const lat = Math.floor(pos.lat * 10000) / 10000
        const lng = Math.floor(pos.lng * 10000) / 10000
        console.log(lat,lng);
        //中心からの距離を取得
        let dist = getDistanse(map)
        console.log(dist);
        //url作成
        let url = createURL(lng, lat, dist)
        console.log(url);
        // //プロット済みのマーカーをいったん削除
        // map.removeLayer(clamp_layer);
        //クランプ一覧も初期化
        clamps=[]
        // //新しい条件でデータをもらいプロットする
        tmp = plotClamps(url, apiToken)
        console.log(tmp);
        
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