import React, { Component } from 'react';
import './App.css';
import PlayingFieldContainer from './components/PlayingFieldContainer'
import { Stage, Layer } from "react-konva";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <PlayingFieldContainer />
            </Layer>
          </Stage>
        </header>
      </div>
    );
  }
}

export default App;
