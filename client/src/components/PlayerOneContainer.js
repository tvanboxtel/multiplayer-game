import * as React from 'react'
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { Circle } from "react-konva";
import { movePlayerOne, movePlayer1 } from '../actions/player'
import { connect } from 'react-redux'


const keys = [],
    MIN_Y = 52,
    MAX_Y = HEIGHT - MIN_Y,
    boardCenterX = WIDTH / 2,
    puckSize = 52;

class PlayerOneContainer extends React.Component {

    move = () => {

        this.props.movePlayerOne({ velocityX: this.props.playerOne.velocityX * this.props.playerOne.frictionX })
        this.props.movePlayerOne({ velocityY: this.props.playerOne.velocityY * this.props.playerOne.frictionY })


        this.props.movePlayerOne({ positionX: this.props.playerOne.positionX + this.props.playerOne.velocityX })
        this.props.movePlayerOne({ positionY: this.props.playerOne.positionY + this.props.playerOne.velocityY })
    }

    moveController = (event) => {

        keys[event.keyCode] = true

        // Up
        if (keys[87]) {
            if (this.props.playerOne.positionY > 0 + puckSize) {
                this.props.movePlayerOne({ velocityY: this.props.playerOne.velocityY - this.props.playerOne.acceleration })
                this.move()
            } 
        }

        // // Down
        if (keys[83]) {
            if (this.props.playerOne.positionY < MAX_Y) {
                this.props.movePlayerOne({ velocityY: this.props.playerOne.velocityY + this.props.playerOne.acceleration })
                this.move()
            }
        }

        // Right
        if (keys[68]) {
            if (this.props.playerOne.positionX < boardCenterX - puckSize) {
                this.props.movePlayerOne({ velocityX: this.props.playerOne.velocityX + this.props.playerOne.acceleration })
                this.move()
            } 
        }

        // Left, decrease acceleration
        if (keys[65]) {
            if (this.props.playerOne.positionX > 0 + puckSize) {
                this.props.movePlayerOne({ velocityX: this.props.playerOne.velocityX - this.props.playerOne.acceleration })
                this.move()
            } 
        }

    }


    keysReleased = (event) => {
        keys[event.keyCode] = false;
    }

    tester = () => {
        if (keys[65]) {
                this.props.movePlayer1(this.props.playerOne.positionX, this.props.playerOne.positionY, this.props.playerOne.velocityX, this.props.playerOne.velocityY)
        }
    }

    // used to be ComponentWillMount
    componentDidMount() {
        window.addEventListener('keydown', this.moveController)
        window.addEventListener('keydown', this.tester)
        window.addEventListener('keyup', this.keysReleased)
        this.animate()
    }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.move()
    }

    keepPlayerInsideField = () => {
        // X-axis borders
        if (this.props.playerOne.positionX > (boardCenterX - puckSize)) {
            this.props.movePlayerOne({
                positionX: boardCenterX - puckSize,
                velocityX: -this.props.playerOne.velocityX * 0.75
            })
        }

        if (this.props.playerOne.positionX < (0 + puckSize)) {
            this.props.movePlayerOne({
                positionX: 0 + puckSize,
                velocityX: -this.props.playerOne.velocityX * 0.75
            })
        }
        // Y-axis borders
        if (this.props.playerOne.positionY > MAX_Y) {
            this.props.movePlayerOne({
                positionY: MAX_Y,
                velocityY: -this.props.playerOne.velocityY * 0.75
            })
        }
        if (this.props.playerOne.positionY < (0 + puckSize)) {
            this.props.movePlayerOne({
                positionY: 0 + puckSize,
                velocityY: -this.props.playerOne.velocityY * 0.75
            })
        }
    }

    componentDidUpdate() {
        this.keepPlayerInsideField()
    }

    render() {
        return (
            <Circle
                x={this.props.playerOne.positionX}
                y={this.props.playerOne.positionY}
                radius={puckSize}
                fill={'blue'}
                stroke={'black'}
                strokeWidth={3}
                mass={this.props.playerOne.mass}
                velocityX={this.props.playerOne.velocityX}
                velocityY={this.props.playerOne.velocityY}
                frictionX={this.props.playerOne.frictionX}
                frictionY={this.props.playerOne.frictionY}
                acceleration={this.props.playerOne.acceleration}
            />
        );
    }

}

const mapStateToProps = state => {
    return {
        playerOne: state.playerOne
    }
}


export default connect(mapStateToProps, { movePlayerOne, movePlayer1 })(PlayerOneContainer)

// Potential border stoppage
// else {
//     this.props.movePlayerOne({ velocityX: 0, velocityY: 0 })
// }