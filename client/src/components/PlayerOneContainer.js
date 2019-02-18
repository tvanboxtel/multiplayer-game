import React, { PureComponent } from "react";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { Circle } from "react-konva";

// import PlayerOne from './PlayerOne'

const keys = [],
    MIN_Y = 52,
    MAX_Y = HEIGHT - MIN_Y,
    boardCenterX = WIDTH / 2,
    puckSize = 50;

export default class PlayerOneContainer extends PureComponent {
    state = {
        positionX: WIDTH / 5,
        positionY: HEIGHT / 2,
        x: WIDTH / 5,
        y: HEIGHT / 2,
        mass: 15,
        velocityX: 0,
        velocityY: 0,
        frictionX: 0.997,
        frictionY: 0.997,
        acceleration: 1
    };

    // keysPressed = (event) => {
    //     keys[event.keyCode] = true
    //     // up, w = 87
    //     if (keys[38]) {
    //         this.setState({ positionY: this.state.positionY - 10 })
    //     }

    //     // down, s = 83
    //     if (keys[40]) {
    //         this.setState({ positionY: this.state.positionY + 10 })
    //     }

    //     // right, d = 68
    //     if (keys[39]) {
    //         this.setState({ positionX: this.state.positionX + 10 })
    //     }

    //     //left, a = 65
    //     if (keys[37]) {
    //         this.setState({ positionX: this.state.positionX - 10 })
    //     }
    // }

    moveController = (event) => {

        keys[event.keyCode] = true


        const move = () => {

            // // Apply friction
            this.setState({velocityX: this.state.velocityX * this.state.frictionX})
            this.setState({velocityY: this.state.velocityY * this.state.frictionY})

            // Update position
            this.setState({positionX: this.state.positionX + this.state.velocityX})
            this.setState({positionY: this.state.positionY + this.state.velocityY})
        }

        // Up
        // if (keys[38] && controllerOne.velocityY < controllerOne.maxSpeed) {
        if (keys[38]) {
            this.setState({ velocityY: this.state.velocityY - this.state.acceleration })
            move()
        }

        // // Down
        // if (keys[40] && controllerOne.velocityY < controllerOne.maxSpeed) {
        if (keys[40]) {
            this.setState({ velocityY: this.state.velocityY + this.state.acceleration })
            move()
        }

        // Right
        // if (keys[39] && controllerOne.velocityX < controllerOne.maxSpeed) {
        if (keys[39]) {
            this.setState({ velocityX: this.state.velocityX + this.state.acceleration })
            move()
        }

        // Left, decrease acceleration
        if (keys[37]) {
            // console.log(this.state.velocityX)
            this.setState({ velocityX: this.state.velocityX - this.state.acceleration })
            move()
            // console.log(this.state.controllerOne.velocityX)
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

    keepPlayerInsideField = () => {
        // X-axis borders
        if (this.state.positionX > (boardCenterX - puckSize)) {
            this.setState({
                positionX: boardCenterX - puckSize
            })
        }
        if (this.state.positionX < (0 + puckSize)) {
            this.setState({
                positionX: 0 + puckSize
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
                positionY: 0 + puckSize
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
                fill={'green'}
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
