import * as React from 'react'
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { Circle } from "react-konva";
import { movePlayerOne, movePlayer1 } from '../actions/player'
import { connect } from 'react-redux'

const keys = [],
    MIN_Y = 52,
    MAX_Y = HEIGHT - MIN_Y,
    boardCenterX = WIDTH / 2

const paddleOneURL = 'https://i.imgur.com/2P2zPXi.png'

class PlayerOneContainer extends React.Component {

    constructor(...args) {
        super(...args);
        const image = new window.Image()
        image.onload = () => {
          this.setState({
            fillPatternImage: image
          })
        }
        image.src = paddleOneURL
        this.state = {
          color: 'green',
          fillPatternImage: null
        }
      }

    move = () => {
        this.props.movePlayerOne({
            positionX: this.props.playerOne.positionX + this.props.playerOne.velocityX,
            positionY: this.props.playerOne.positionY + this.props.playerOne.velocityY,
            velocityX: this.props.playerOne.velocityX * this.props.playerOne.frictionX,
            velocityY: this.props.playerOne.velocityY * this.props.playerOne.frictionY
        })
    }

    moveController = (event) => {
        keys[event.keyCode] = true

        // Up
        if (keys[87]) {
            if (this.props.playerOne.positionY > 0 + this.props.playerOne.puckSize) {
                this.props.movePlayerOne({ velocityY: this.props.playerOne.velocityY - this.props.playerOne.acceleration })
                this.move()
                this.mirrorMode()
            }
        }

        // // Down
        if (keys[83]) {
            if (this.props.playerOne.positionY < MAX_Y) {
                this.props.movePlayerOne({ velocityY: this.props.playerOne.velocityY + this.props.playerOne.acceleration })
                this.move()
                this.mirrorMode()
            }
        }

        // Right
        if (keys[68]) {
            if (this.props.playerOne.positionX < boardCenterX - this.props.playerOne.puckSize) {
                this.props.movePlayerOne({ velocityX: this.props.playerOne.velocityX + this.props.playerOne.acceleration })
                this.move()
                this.mirrorMode()
            }
        }

        // Left, decrease acceleration
        if (keys[65]) {
            if (this.props.playerOne.positionX > 0 + this.props.playerOne.puckSize) {
                this.props.movePlayerOne({ velocityX: this.props.playerOne.velocityX - this.props.playerOne.acceleration })
                this.move()
                this.mirrorMode()
            }
        }
    }

    keysReleased = (event) => {
        keys[event.keyCode] = false;
    }

    mirrorMode = () => {
        this.props.movePlayer1(this.props.playerOne.positionX, this.props.playerOne.positionY, this.props.playerOne.velocityX, this.props.playerOne.velocityY)
    }

    componentDidMount() {
        window.addEventListener('keydown', this.moveController)
        window.addEventListener('keydown', this.tester)
        window.addEventListener('keyup', this.keysReleased)
        this.animate()
        this.mirrorMode()
    }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.move()
    }

    keepPlayerInsideField = () => {


        // X-axis borders
        if (this.props.playerOne.positionX > (boardCenterX - this.props.playerOne.puckSize)) {
            this.props.movePlayerOne({
                positionX: boardCenterX - this.props.playerOne.puckSize,
                velocityX: -this.props.playerOne.velocityX * 0.75
            })
        }

        if (this.props.playerOne.positionX < (0 + this.props.playerOne.puckSize)) {
            this.props.movePlayerOne({
                positionX: 0 + this.props.playerOne.puckSize,
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
        if (this.props.playerOne.positionY < (0 + this.props.playerOne.puckSize)) {
            this.props.movePlayerOne({
                positionY: 0 + this.props.playerOne.puckSize,
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
                radius={this.props.playerOne.puckSize}
                fillPatternImage={this.state.fillPatternImage}
                fillPatternOffset={{ x: 73, y: 74 }}
                fillPatternScale={-100}
                stroke={'black'}
                strokeWidth={2}
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