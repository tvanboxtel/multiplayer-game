import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";

const MIN_X = 52,
    MIN_Y = 52,
    SPEED = 29;

export default class PlayerOne extends PureComponent {
    state = {
        x: MIN_X,
        y: MIN_Y,
        direction: { x: 0, y: 0 }
    };

    componentDidMount() {
        const x = Math.floor(Math.random() * SPEED);
        const y = SPEED - x;
        this.setState({ direction: { x, y } });
    }


    render() {

        return (

            
            <Circle
                ref={comp => {
                    this.ball = comp;
                }}
                x={WIDTH / 5}
                y={HEIGHT / 2}
                radius={50}
                fill={'blue'}
                stroke={'black'}
                strokeWidth={3}
                // shadowBlur={}
            />
        );
    }

}
