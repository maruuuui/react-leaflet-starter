import React, { Component } from 'react'

import { getPhotoUrl, countClamps, deleteClampRecord } from "../utils"

export default class SimpleExample extends Component {
    constructor(props){
        super(props)
        // this.setLeafletElement = this.setLeafletElement.bind(this)

        this.state={
            photoId : props.photoInfo.id,
            showListFunc: props.showListFunc
        }
    }

    onDeleteButtonClick = (event) => {
        let do_delete = window.confirm("本当に削除しますか？")
        if(!do_delete){
            return;
        }

        deleteClampRecord(this.state.photoId)

        //
        this.state.showListFunc()
    }

    render() {
        const photoInfo = this.props.photoInfo
        const showListFunc = this.props.showListFunc
        const photoUrl = getPhotoUrl(photoInfo)
        const memo = "memo"
        const inferenceStatus = countClamps(photoInfo)

        const clampDetails = <a>sasadsad</a>
        return (
            <div>
                <button 
                    className="button is-small is-fullwidth"
                    onClick={e=>showListFunc()}
                    >
                    <small>クランプ一覧に戻る</small>
                </button>
                <table className="table is-fullwidth">
                    <tbody>
                        <tr>
                            <td colSpan="2" style={{ "textAlign": "center" }}>
                                <a href={photoUrl} target=".">
                                    <img src={photoUrl} className="image is-128x128" />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>緯度</td>
                            <td>{photoInfo.point.coordinates[1]}</td>
                        </tr>
                        <tr>
                            <td>経度</td>
                            <td>{photoInfo.point.coordinates[0]}</td>
                        </tr>
                        <tr>
                            <td>画像ファイル名</td>
                            <td>{photoInfo.name}</td>
                        </tr>
                        <tr>
                            <td>画像id</td>
                            <td>{photoInfo.id}</td>
                        </tr>
                        <tr>
                            <td>備考</td>
                            <td>{memo}</td>
                        </tr>
                        <tr>
                            <td>撮影日時</td>
                            <td>{photoInfo.filming_datetime}</td>
                        </tr>
                        <tr>
                            <td>アップロード日時</td>
                            <td>{photoInfo.created_at}</td>
                        </tr>
                        <tr>
                            <td>解析日時</td>
                            <td>{photoInfo.updated_at}</td>
                        </tr>
                        <tr>
                            <td>解析結果</td>
                            <td>{inferenceStatus}</td>
                        </tr>
                    </tbody>
                </table>
                {clampDetails}
                <button
                    className="button is-danger is-small is-fullwidth"
                    onClick={this.onDeleteButtonClick}
                >
                    <small>データ削除</small>
                </button>
            </div>
        )
    }
}
