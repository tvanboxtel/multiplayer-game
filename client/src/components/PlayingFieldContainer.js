import React, { PureComponent } from "react";
import { Group, Rect } from "react-konva";

export const WIDTH = 750;
export const HEIGHT = 500;

export default class PlayingFieldContainer extends PureComponent {
  render() {
    return (
      <Group>
        <Rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill="rgb(0,0,0)"
          shadowBlur={2}
        />
        <Rect
          x={2}
          y={2}
          width={WIDTH - 4}
          height={HEIGHT - 4}
          fill="rgb(255,255,255)"
        />
      </Group>
    );
  }
}
