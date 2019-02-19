import React, { PureComponent } from "react";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { Circle } from "react-konva";

const keys = [],
    MIN_Y = 52,
    MAX_Y = HEIGHT - MIN_Y,
    MAX_X = WIDTH,
    boardCenterX = WIDTH / 2,
    puckSize = 52;

export default class PlayerTwoContainer extends PureComponent {
    state = {
        positionX: WIDTH / 1.25,
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

    moveController = (event) => {

        keys[event.keyCode] = true


        const move = () => {

            this.setState({ velocityX: this.state.velocityX * this.state.frictionX })
            this.setState({ velocityY: this.state.velocityY * this.state.frictionY })


            this.setState({ positionX: this.state.positionX + this.state.velocityX })
            this.setState({ positionY: this.state.positionY + this.state.velocityY })
        }

        // Up
        if (keys[38]) {
            if (this.state.positionY > 0 + puckSize) {
                this.setState({ velocityY: this.state.velocityY - this.state.acceleration })
                move()
            } else {
                this.setState({ velocityY: 0, velocityX: 0 })
            }
        }

        // // Down
        if (keys[40]) {
            if (this.state.positionY < MAX_Y) {
                this.setState({ velocityY: this.state.velocityY + this.state.acceleration })
                move()
            } else {
                this.setState({ velocityY: 0, velocityX: 0 })
            }
        }

        // Right
        if (keys[39]) {
            if (this.state.positionX < WIDTH - puckSize) {
                this.setState({ velocityX: this.state.velocityX + this.state.acceleration })
                move()
            } else {
                this.setState({ velocityX: 0, velocityY: 0 })
            }
        }

        // Left, decrease acceleration
        if (keys[37]) {
            if (this.state.positionX > boardCenterX + puckSize) {
                this.setState({ velocityX: this.state.velocityX - this.state.acceleration })
                move()
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
    }

    keepPlayerInsideField  = ()  => {
        // X-axis borders
        if (this.state.positionX < (boardCenterX + puckSize)) {
            this.setState({
                positionX: boardCenterX + puckSize
            })
        }
        if (this.state.positionX > (MAX_X - puckSize)) {
            this.setState({
                positionX : MAX_X - puckSize
            })
        }
        // Y-axis borders
        if (this.state.positionY > MAX_Y) {
            this.setState({
                positionY: MAX_Y
            })
        }
        if (this.state.positionY < (0 + puckSize)) {
            this.setState({
                positionY : 0 + puckSize
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
                fill={'red'}
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
