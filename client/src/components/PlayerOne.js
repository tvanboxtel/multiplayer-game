import React from "react";
import { Circle } from "react-konva";

const puckSize = 50;

export default function PlayerOne(props) {
    const {x, y} = props

    return (<Circle
        x={x}
        y={y}
        radius={puckSize}
        fill={'blue'}
        stroke={'black'}
        strokeWidth={3}
    />)
}