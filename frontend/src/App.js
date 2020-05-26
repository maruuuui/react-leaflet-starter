import Leaflet from 'leaflet'
import React, { Component } from 'react';
import { Columns, Container } from 'react-bulma-components'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './App.css';
import './App.sass';
import 'leaflet/dist/leaflet.css';

import Header from './components/header'
import ClampMap from './components/clampMap'
import SideList from './components/sideList'

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/'

class App extends Component {

  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }
  position = [this.state.lat, this.state.lng]
  render() {

    return (

      <Container className="mainStyle">
        <Header />

        <Columns className="mainStyle">
          <Columns.Column size="one-fifth" className="sideList">
            <SideList />
          </Columns.Column>
          <Columns.Column className="map">
            <ClampMap zoom={this.state.zoom} position={this.position} />
          </Columns.Column>
        </Columns>

      </Container>

    );
  }
}

export default App;