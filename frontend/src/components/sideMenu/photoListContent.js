import React, { Component } from 'react'

import { getPhotoUrl, countClamps, getMemo } from "../utils"
export default class SimpleExample extends Component {

    //マーカークリック時のクランプ一覧タブ内の項目を組み立てる


    render() {
        const clampIndex = this.props.clampIndex
        const photoInfo = this.props.photoInfo
        const showDetailFunc = this.props.showDetailFunc
        const photoUrl = getPhotoUrl(photoInfo)
        const memo = getMemo(photoInfo)
        const inferenceStatus = countClamps(photoInfo)
        return (
            <tbody>
                <tr>
                    <td colSpan="2">クランプ{clampIndex + 1}</td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ "textAlign": "center" }}>
                        <a href={photoUrl} target=".">
                            <img src={photoUrl} className="image is-128x128" />
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>備考</td>
                    <td>{memo}</td>
                </tr>

                <tr>
                    <td>動作状況</td>
                    <td>{inferenceStatus}</td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button 
                            value={clampIndex + 1} 
                            className="button is-primary is-fullwidth show_detail_button" 
                            onClick={e => showDetailFunc(clampIndex)}>
                            詳細表示
                        </button>
                    </td>
                </tr>
            </tbody>
        )
    }
}
// <tr>
//     <td>lat {photoInfo.point.coordinates[1]}</td>
//     <td>lng {photoInfo.point.coordinates[0]}</td>
// </tr>