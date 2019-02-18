import React from "react";
import { Circle } from "react-konva";

const puckSize = 50;

export default function PlayerTwo(props) {
    const {x, y} = props

    return (<Circle
        x={x}
        y={y}
        radius={puckSize}
        fill={'red'}
        stroke={'black'}
        strokeWidth={3}
    />)
}