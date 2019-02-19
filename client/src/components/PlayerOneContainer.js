import React, { PureComponent } from "react";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { Circle } from "react-konva";

const keys = [],
    MIN_Y = 52,
    MAX_Y = HEIGHT - MIN_Y,
    boardCenterX = WIDTH / 2,
    puckSize = 52;

export default class PlayerOneContainer extends PureComponent {
    state = {
        positionX: WIDTH / 5,
        positionY: HEIGHT / 2,
        x: WIDTH / 5,
        y: HEIGHT / 2,
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

    moveController = (event) => {

        keys[event.keyCode] = true

        // Up
        if (keys[87]) {
            if (this.state.positionY > 0 + puckSize) {
                this.setState({ velocityY: this.state.velocityY - this.state.acceleration })
                this.move()
            } else {
                this.setState({ velocityY: 0, velocityX: 0 })
            }
        }

        // // Down
        if (keys[83]) {
            if (this.state.positionY < MAX_Y) {
                this.setState({ velocityY: this.state.velocityY + this.state.acceleration })
                this.move()
            } else {
                this.setState({ velocityY: 0, velocityX: 0 })
            }
        }

        // Right
        if (keys[68]) {
            if (this.state.positionX < boardCenterX - puckSize) {
                this.setState({ velocityX: this.state.velocityX + this.state.acceleration })
                this.move()
            } else {
                this.setState({ velocityX: 0, velocityY: 0 })
            }
        }

        // Left, decrease acceleration
        if (keys[65]) {
            if (this.state.positionX > 0 + puckSize) {
                this.setState({ velocityX: this.state.velocityX - this.state.acceleration })
                this.move()
            } else {
                this.setState({ velocityX: 0, velocityY: 0 })
            }
        }

    }


    keysReleased = (event) => {
        keys[event.keyCode] = false;
    }

    // used to be ComponentWillMount
    componentDidMount() {
        window.addEventListener('keydown', this.moveController)
        window.addEventListener('keyup', this.keysReleased)
        this.animate()
    }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.move()
    }
    
    keepPlayerInsideField = () => {
        // X-axis borders
        if (this.state.positionX > (boardCenterX - puckSize)) {
            this.setState({
                positionX: boardCenterX - puckSize,
            })
        }
        if (this.state.positionX < (0 + puckSize)) {
            this.setState({
                positionX: 0 + puckSize,
            })
        }
        // Y-axis borders
        if (this.state.positionY > MAX_Y) {
            this.setState({
                positionY: MAX_Y,
            })
        }
        if (this.state.positionY < (0 + puckSize)) {
            this.setState({
                positionY: 0 + puckSize,
            })
        }
    }

    componentDidUpdate() {
        this.keepPlayerInsideField()
    }

    render() {
        return (
            <Circle
                x={this.state.positionX}
                y={this.state.positionY}
                radius={puckSize}
                fill={'blue'}
                stroke={'black'}
                strokeWidth={3}
                mass={this.state.mass}
                velocityX={this.state.velocityX}
                velocityY={this.state.velocityY}
                frictionX={this.state.frictionX}
                frictionY={this.state.frictionY}
                acceleration={this.state.acceleration}
            />
        );
    }

}
