import Leaflet from 'leaflet'
import React, { Component } from 'react';
import { Columns, Container } from 'react-bulma-components'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './App.css';
import './App.sass';
import 'leaflet/dist/leaflet.css';

import Header from './components/header'
import ClampMap from './components/clampMap/clampMap'
import PhotoList from './components/sideMenu/photoList'
import PhotoDetail from './components/sideMenu/photoDetail'
// import Popup from './components/ImagePopup/imagePopupMenu'

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/'

export const apiUrl = "http://localhost:8000/api/v1/clampphoto/"
class App extends Component {

  state = {
    lat: 36,
    lng: 137,
    zoom: 13,
    clamps: [],
    clampMarkers:[],
    sideMenu: "photoList",
    photoToBeShown: null,
    showPopup: false
  }
  clampsStateChange = newClamps => {
    this.setState({clamps:newClamps})
  }

  // react-leafretによって作られたマーカーをstateに保管する関数
  pushMarkerElementFunc = newMarkers => {
    //setState()を呼ぶと画面が再描画されてしまうため直接代入する
    this.state.clampMarkers.push(newMarkers)
  }

  // サイドメニューに表示する項目を指定された写真の詳細に切り替える
  sideMenuStateChangeToPhotoDetail = (index) => {
    const photoToBeShown = this.state.clamps[index]
    const markerElement = this.state.clampMarkers[index]

    console.log(this.state.clampMarkers)
    console.log(index)
    markerElement.openPopup()

    this.setState({
      sideMenu:"photoDetail",
      photoToBeShown: photoToBeShown,
    })
  }
  // サイドメニューに表示する項目を写真一覧に切り替える
  sideMenuStateChangeToPhotoList = () => {
    this.setState({sideMenu:"photoList"})
  }

  // 画像アップロード用ポップアップメニューの表示状態を切り替える関数
  togglePopup() {
    console.log("toggle")
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    // const togglePopupButton = 
    const position = [this.state.lat, this.state.lng];
    const sideListContent = (this.state.sideMenu === "photoList") 
    ? <PhotoList 
        clamps={this.state.clamps} 
        showDetailFunc={this.sideMenuStateChangeToPhotoDetail}
      /> 
    : <PhotoDetail 
        photoInfo={this.state.photoToBeShown} 
        showListFunc={this.sideMenuStateChangeToPhotoList}
      /> 
    

    return (
      <Container className="mainStyle">
        <Header />

        <Columns className="mainStyle">
          <Columns.Column size="one-fifth" className="sideList">
            {sideListContent}
          </Columns.Column>
          <Columns.Column className="map">
            <ClampMap 
              zoom={this.state.zoom} 
              position={position} 
              clamps={this.state.clamps} 
              setClampsFunc={this.clampsStateChange} 
              pushMarkerElementFunc={this.pushMarkerElementFunc} 
              openSideMenuFunc={this.sideMenuStateChangeToPhotoDetail}
            />
          </Columns.Column>
        </Columns>

      </Container>

    );
  }
}

export default App;