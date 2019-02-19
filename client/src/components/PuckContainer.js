import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";

const puckSize = 25,
    initialX = WIDTH / 2,
    initialY = HEIGHT / 2,
    MAX_X = WIDTH,
    MAX_Y = HEIGHT


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

    keepPuckInsideField  = ()  => {

        // puck does not slow down upon collision.
        // If desired, add slow down multiplier to:
        // -this.state.${velocityDirection} * ${brakeFactor}
        // X-axis borders

        if (this.state.positionX > (MAX_X - puckSize)) {
            this.setState({
                positionX : MAX_X - puckSize,
                velocityX: -this.state.velocityX  
            })
        }
        // Y-axis borders
        if (this.state.positionY > MAX_Y) {
            this.setState({
                positionY: MAX_Y,
                velocityY: -this.state.velocityY
            })
        }
        if (this.state.positionY < (0 + puckSize)) {
            this.setState({
                positionY : 0 + puckSize,
                velocityY: -this.state.velocityY
            })
        }
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
