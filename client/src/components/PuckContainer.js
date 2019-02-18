import React, { PureComponent } from "react";
// import Konva from "konva";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";

const MIN_X = 32,
  MIN_Y = 32,
  MAX_X = WIDTH - MIN_X,
  MAX_Y = HEIGHT - MIN_Y,
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

  newCoord = (val, delta, max, min) => {
    let newVal = val + delta;
    let newDelta = delta;

    if (newVal > max || newVal < min) {
      newDelta = -delta;
    }

    if (newVal < min) {
      newVal = min - newVal;
    }
    if (newVal > max) {
      newVal = newVal - (newVal - max);
    }

    return { val: newVal, delta: newDelta };
  };

  render() {
    const { color, x, y } = this.state;

    return (
      <Circle
        ref={comp => {
          this.ball = comp;
        }}
        x={x}
        y={y}
        radius={30}
        fill={color}
        shadowBlur={4}
      />
    );
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeout);
  }
}
