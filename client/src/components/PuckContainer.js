import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";

const puckSize = 25,
    initialX = WIDTH / 2,
    initialY = HEIGHT / 2


export default class Puck extends PureComponent {
    state = {
        positionX: initialX,
        positionY: initialY,
        mass: 15,
        velocityX: 0,
        velocityY: 0,
        frictionX: 1,
        frictionY: 1,
        acceleration: 1
    };

    move = () => {

        this.setState({ velocityX: this.state.velocityX * this.state.frictionX })
        this.setState({ velocityY: this.state.velocityY * this.state.frictionY })

        this.setState({ positionX: this.state.positionX + this.state.velocityX })
        this.setState({ positionY: this.state.positionY + this.state.velocityY })
    }

    componentDidMount() {
        this.animate()
    }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.move()
    }

    render() {
        return (
            <Circle
                x={initialX}
                y={initialY}
                radius={puckSize}
                fill={'grey'}
                stroke={'black'}
                strokeWidth={2}
            />
        );
    }

}
