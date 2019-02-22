import React, { Component } from 'react';
import './App.css';
import PlayingFieldContainer from './components/PlayingFieldContainer'
import Puck from './components/PuckContainer'
import PlayerOneContainer from './components/PlayerOneContainer'
import PlayerTwoContainer from './components/PlayerTwoContainer'
import ScoreboardContainer from './components/ScoreboardContainer'
import ScoreContainer from './components/ScoreContainer'
import { Stage, Layer } from "react-konva";
import { Provider } from 'react-redux'
import store from './store'

export default class App extends Component {



  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Air Hockey</h1>
          <Stage width={950} height={475}>
            <Provider store={store}>
              <Layer>
                <PlayingFieldContainer className="Playing-field" />
                <Puck />
                <PlayerOneContainer />
                <PlayerTwoContainer />
              </Layer>
            </Provider>
          </Stage>
          <Stage width={500} height={150}>
            <Provider store={store}>
              <Layer>
                <ScoreboardContainer />
                <ScoreContainer />
              </Layer>
            </Provider>
          </Stage>
        </header>
      </div>
    );
  }
}
