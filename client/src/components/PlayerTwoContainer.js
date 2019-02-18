import React, { PureComponent } from "react";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import PlayerTwo from './PlayerTwo'

const keys = [],
    MIN_Y = 52,
    MAX_Y = HEIGHT - MIN_Y,
    MAX_X = WIDTH,
    boardCenterX = WIDTH / 2,
    puckSize = 50;

export default class PlayerTwoContainer extends PureComponent {
    state = {
        positionX: WIDTH / 1.25,
        positionY: HEIGHT / 2
    };

    keysPressed = (event) => {
        keys[event.keyCode] = true
        // up, w = 87
        if (keys[87]) {
            this.setState({ positionY: this.state.positionY - 10 })
        }

        // down, s = 83
        if (keys[83]) {
            this.setState({ positionY: this.state.positionY + 10 })
        }

        // right, d = 68
        if (keys[68]) {
            this.setState({ positionX: this.state.positionX + 10 })
        }

        //left, a = 65
        if (keys[65]) {
            this.setState({ positionX: this.state.positionX - 10 })
        }
    }
    keysReleased = (event) => {
        keys[event.keyCode] = false;
    }
    // used to be ComponentWillMount
    componentDidMount() {
        window.addEventListener('keydown', this.keysPressed)
        window.addEventListener('keyup', this.keysReleased)
    }

    keepPlayerInsideField  = ()  => {
        // X-axis borders
        if (this.state.positionX < (boardCenterX + puckSize)) {
            this.setState({
                positionX: boardCenterX + puckSize
            })
        }
        if (this.state.positionX > (MAX_X - puckSize)) {
            this.setState({
                positionX : MAX_X - puckSize
            })
        }
        // Y-axis borders
        if (this.state.positionY > MAX_Y) {
            this.setState({
                positionY: MAX_Y
            })
        }
        if (this.state.positionY < (0 + puckSize)) {
            this.setState({
                positionY : 0 + puckSize
            })
        }
    }

    componentDidUpdate() {
        this.keepPlayerInsideField()
    }
    render() {      
        return (
            <PlayerTwo x={this.state.positionX} y={this.state.positionY}/>
        );
    }

}
