import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";

const MIN_X = 52,
    MIN_Y = 52,
    SPEED = 29;

export default class PlayerTwo extends PureComponent {
    state = {
        color: 'red',
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
        const { color } = this.state;

        return (
            <Circle
                ref={comp => {
                    this.ball = comp;
                }}
                x={WIDTH / 2}
                y={HEIGHT / 1.2 }
                radius={50}
                fill={color}
                stroke={'black'}
                strokeWidth={3}
                // shadowBlur={10}
            />
        );
    }

}
