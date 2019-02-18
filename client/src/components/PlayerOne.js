import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";

const keys = [],
    MIN_X = 52,
    MIN_Y = 52,
    MAX_X = WIDTH - MIN_X,
    MAX_Y = HEIGHT - MIN_Y,
    boardCenterX = WIDTH / 2,
    // boardCenterY = HEIGHT / 2,
    puckSize = 50;
let controllerOne;



export default class PlayerOne extends PureComponent {
    state = {
        positionX: WIDTH / 5,
        positionY: HEIGHT / 2
    };



    keysPressed = (event) => {

        keys[event.keyCode] = true
        // const code = event.keyCode
        //do we need this?
        // ? event.keyCode : event.which;

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

    keepPlayerInsideField() {
        // X-axis borders
        if (this.state.positionX > (boardCenterX - puckSize)) {
            this.state.positionX = boardCenterX - puckSize
        }
        if (this.state.positionX < (0 + puckSize)){
            this.state.positionX = 0 + puckSize
        }

    }

    render() {

        this.keepPlayerInsideField()
        return (

            <Circle
                ref={comp => {
                    this.ball = comp;
                }}
                x={this.state.positionX}
                y={this.state.positionY}
                radius={puckSize}
                fill={'blue'}
                stroke={'black'}
                strokeWidth={3}
            // shadowBlur={}
            />
        );
    }

}
