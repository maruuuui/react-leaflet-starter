import React, { Component } from 'react'

import {PopupMenu} from './ImagePopup/imagePopupMenu'
export default class SimpleExample extends Component {


    render() {
        return (
            <header className="colimn background">
                <h1 className="title margin">放電クランプ動作状況判定AI 解析結果表示</h1>
                <br/>
                {/* <button onClick={this.props.togglePopupFunc}>show popup</button> */}
                
                {/* <a href="" className="style">画像アップロード画面</a>
                <a href="" className="style">解析結果表示画面</a> */}
                <PopupMenu/>
            </header>
        )
    }
}