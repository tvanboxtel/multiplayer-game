import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";

export default class PlayerOne extends PureComponent {
    state = {
        positionX: WIDTH / 5,
        positionY: HEIGHT / 2
    };




    handleKeyboardInput = (event) => {
        const code = event.keyCode ? event.keyCode : event.which;

        if (code === 38) { // up
            this.setState({positionY: this.state.positionY - 1})
            // this.setState({direction: {y: -1}});
            // this.setState({message: console.log('hi!')})
        }
    }

    componentWillMount() {
        window.addEventListener('keydown', this.handleKeyboardInput.bind(this))
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
