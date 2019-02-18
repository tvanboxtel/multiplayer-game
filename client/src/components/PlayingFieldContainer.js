import React, { PureComponent } from "react";
import { Group, Rect } from "react-konva";

// does not resize on window size change
export const WIDTH = window.innerWidth / 2;
export const HEIGHT = window.innerHeight / 2;

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
