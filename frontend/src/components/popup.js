import React, { Component } from 'react'
import { Popup } from 'react-leaflet'

import {getPhotoUrl, countClamps, countOperatedClamps} from "./utils"

export default class SimpleExample extends Component {


    render() {
        const clampMarkerInfo = this.props.clampMarkerInfo
        const photoUrl = getPhotoUrl(clampMarkerInfo)
        const clampCount = countClamps(clampMarkerInfo)
        const OperatedClampCount = countOperatedClamps(clampMarkerInfo)
        return (
            <Popup>
                <table className="table is-fullwidth">
                    <tbody>
                        <tr>
                            <td colSpan="2" style={{ "textAlign": "center" }}>
                                <a href={photoUrl} target=".">
                                    <img alt="クランプ" src={photoUrl} className="image is-128x128" />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>撮影日時</td>
                            <td>{clampMarkerInfo.filming_datetime}</td>
                        </tr>
                        <tr>
                            <td>総クランプ数</td>
                            <td>{clampCount}</td>
                        </tr>
                        <tr>
                            <td>動作済みクランプ数</td>
                            <td>{OperatedClampCount}</td>
                        </tr>
                    </tbody>
                </table>
            </Popup>
        )
    }
}