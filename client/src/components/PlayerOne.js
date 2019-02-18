import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";

const keys = [];

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

    render() {

        return (


            <Circle
                ref={comp => {
                    this.ball = comp;
                }}
                x={this.state.positionX}
                y={this.state.positionY}
                radius={50}
                fill={'blue'}
                stroke={'black'}
                strokeWidth={3}
            // shadowBlur={}
            />
        );
    }

}
