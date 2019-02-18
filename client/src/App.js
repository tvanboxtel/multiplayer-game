import React, { Component } from 'react';
import './App.css';
import PlayingFieldContainer from './components/PlayingFieldContainer'
import Puck from './components/PuckContainer'
import PlayerOne from './components/PlayerOne'
import PlayerTwo from './components/PlayerTwo'
import { Stage, Layer } from "react-konva";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Stage width={window.innerWidth / 2} height={window.innerHeight / 2}>
            <Layer>
              <PlayingFieldContainer className="Playing-field"/>
              <Puck />
              <PlayerOne />
              <PlayerTwo />
            </Layer>
          </Stage>
        </header>
      </div>
    );
  }
}

export default App;
