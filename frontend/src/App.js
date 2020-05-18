import Leaflet from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import React, { Component } from 'react';
import { Columns, Container } from 'react-bulma-components'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './App.css';
import './App.sass';
import 'leaflet/dist/leaflet.css';
import ClampMarker from './components/marker'
import Header from './components/header'
import SideList from './components/sideList'

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }
  render() {
    const position = [this.state.lat, this.state.lng]


    return (

      <Container className="mainStyle">
        <Header />

        <Columns className="mainStyle">
          <Columns.Column size="one-fifth" className="sideList">
            <SideList />
          </Columns.Column>
          <Columns.Column className="map">
            <Map center={position} zoom={this.state.zoom}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ClampMarker position={position} />
            </Map>
          </Columns.Column>
        </Columns>

      </Container>

    );
  }
}

export default App;