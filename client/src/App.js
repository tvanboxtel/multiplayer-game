import React, { Component } from 'react';
import './App.css';
import PlayingFieldContainer from './components/PlayingFieldContainer'
import Puck from './components/PuckContainer'
import PlayerOneContainer from './components/PlayerOneContainer'
import PlayerTwoContainer from './components/PlayerTwoContainer'
import { Stage, Layer } from "react-konva";
import openSocket from 'socket.io-client'

import { Provider } from 'react-redux'
import store from './store'

const port = process.env.PORT || 'http://localhost:4000'
openSocket(port)

export default class App extends Component {

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <Stage width={window.innerWidth / 2} height={window.innerHeight / 2}>
            <Provider store={store}>
              <Layer>
                <PlayingFieldContainer className="Playing-field" />
                <Puck />
                <PlayerOneContainer />
                <PlayerTwoContainer />
              </Layer>
              </Provider>
            </Stage>
          </header>
        </div>
    );
  }
}
