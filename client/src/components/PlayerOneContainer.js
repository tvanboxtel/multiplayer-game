import React, { PureComponent } from "react";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import PlayerOne from './PlayerOne'

const keys = [],
    MIN_Y = 52,
    MAX_Y = HEIGHT - MIN_Y,
    boardCenterX = WIDTH / 2,
    puckSize = 50;

export default class PlayerOneContainer extends PureComponent {
    state = {
        positionX: WIDTH / 5,
        positionY: HEIGHT / 2
    };



    keysPressed = (event) => {
        keys[event.keyCode] = true
        // up, w = 87
        if (keys[38]) {
            this.setState({ positionY: this.state.positionY - 10 })
        }

        // down, s = 83
        if (keys[40]) {
            this.setState({ positionY: this.state.positionY + 10 })
        }

        // right, d = 68
        if (keys[39]) {
            this.setState({ positionX: this.state.positionX + 10 })
        }

        //left, a = 65
        if (keys[37]) {
            this.setState({ positionX: this.state.positionX - 10 })
        }
    }
    keysReleased = (event) => {
        keys[event.keyCode] = false;
    }

    componentWillMount() {
        window.addEventListener('keydown', this.keysPressed.bind(this), false)
        window.addEventListener('keyup', this.keysReleased.bind(this), false)
    }

    keepPlayerInsideField  = ()  => {
        // X-axis borders
        if (this.state.positionX > (boardCenterX - puckSize)) {
            this.setState({
                positionX: boardCenterX - puckSize
            })
        }
        if (this.state.positionX < (0 + puckSize)) {
            this.setState({
                positionX : 0 + puckSize
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
            <PlayerOne x={this.state.positionX} y={this.state.positionY}/>
        );
    }

}
