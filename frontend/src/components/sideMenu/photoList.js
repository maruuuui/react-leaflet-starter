import React, { Component } from 'react'

import PhotoListContent from "./photoListContent"

export default class SimpleExample extends Component {

    funcA = () => {
        //画面上のクランプ一覧にあるボタンのいずれかが押されたとき行う処理
        //押されたボタンのvalue番目の詳細情報を左のタブに表示する
    }
    funcB = () => {
//クランプ一覧表示ボタンかが押されたとき行う処理
//クランプ一覧表示関数の実行
    }
    funcC = () => {
//クランプ情報削除ボタンが押された時の処理
    }

    render() {
        const clamps = this.props.clamps
        
        const listItems = clamps.map((clamp, index) =>
        <PhotoListContent 
            photoInfo={clamp} 
            clampIndex={index} 
            key={clamp.id} 
            showDetailFunc={this.props.showDetailFunc}
        />
        );


        return (
            <table className="table is-fullwidth">


                    {listItems}
            </table>
        )
    }
}