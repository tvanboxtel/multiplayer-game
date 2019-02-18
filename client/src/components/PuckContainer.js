import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";

const MIN_X = 32,
    MIN_Y = 32,
    SPEED = 29;

export default class Puck extends PureComponent {
    state = {
        color: 'black',
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
        const { color, x, y } = this.state;

        return (
            <Circle
                ref={comp => {
                    this.ball = comp;
                }}
                x={WIDTH / 2}
                y={HEIGHT / 2}
                radius={30}
                fill={color}
                shadowBlur={10}
            />
        );
    }

}
