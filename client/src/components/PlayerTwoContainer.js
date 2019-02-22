import React, { PureComponent } from "react";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { movePlayerTwo, movePlayer2 } from '../actions/player'
import { connect } from 'react-redux'
import { Circle } from "react-konva";

const keys = [],
    MIN_Y = 52,
    MAX_Y = HEIGHT - MIN_Y,
    MAX_X = WIDTH,
    boardCenterX = WIDTH / 2

    const paddleTwoURL = 'https://i.imgur.com/sqOwggt.png'


class PlayerTwoContainer extends PureComponent {

    constructor(...args) {
        super(...args);
        const image = new window.Image()
        image.onload = () => {
          this.setState({
            fillPatternImage: image
          })
        }
        image.src = paddleTwoURL
        this.state = {
          color: 'green',
          fillPatternImage: null
        }
      }

    move = () => {
        this.props.movePlayerTwo({
            velocityX: this.props.playerTwo.velocityX * this.props.playerTwo.frictionX,
            velocityY: this.props.playerTwo.velocityY * this.props.playerTwo.frictionY,
            positionX: this.props.playerTwo.positionX + this.props.playerTwo.velocityX,
            positionY: this.props.playerTwo.positionY + this.props.playerTwo.velocityY
        })
    }

    moveController = (event) => {

        keys[event.keyCode] = true

        // Up
        if (keys[38]) {
            if (this.props.playerTwo.positionY > 0 + this.props.playerTwo.puckSize) {
                this.props.movePlayerTwo({ velocityY: this.props.playerTwo.velocityY - this.props.playerTwo.acceleration })
                this.move()
                this.mirrorMode()
            }
        }

        // // Down
        if (keys[40]) {
            if (this.props.playerTwo.positionY < MAX_Y) {
                this.props.movePlayerTwo({ velocityY: this.props.playerTwo.velocityY + this.props.playerTwo.acceleration })
                this.move()
                this.mirrorMode()
            }
        }

        // Right
        if (keys[39]) {
            if (this.props.playerTwo.positionX < WIDTH - this.props.playerTwo.puckSize) {
                this.props.movePlayerTwo({ velocityX: this.props.playerTwo.velocityX + this.props.playerTwo.acceleration })
                this.move()
                this.mirrorMode()
            }
        }

        // Left, decrease acceleration
        if (keys[37]) {
            if (this.props.playerTwo.positionX > boardCenterX + this.props.playerTwo.puckSize) {
                this.props.movePlayerTwo({ velocityX: this.props.playerTwo.velocityX - this.props.playerTwo.acceleration })
                this.move()
                this.mirrorMode()
            }
        }

    }


    keysReleased = (event) => {
        keys[event.keyCode] = false;
    }

    mirrorMode = () => {
        this.props.movePlayer2(this.props.playerTwo.positionX, this.props.playerTwo.positionY, this.props.playerTwo.velocityX, this.props.playerTwo.velocityY)
    }

    // used to be ComponentWillMount
    componentDidMount() {
        window.addEventListener('keydown', this.moveController)
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
        if (this.props.playerTwo.positionX < (boardCenterX + this.props.playerTwo.puckSize)) {
            this.props.movePlayerTwo({
                positionX: boardCenterX + this.props.playerTwo.puckSize,
                velocityX: -this.props.playerTwo.velocityX * 0.75

            })
        }
        if (this.props.playerTwo.positionX > (MAX_X - this.props.playerTwo.puckSize)) {
            this.props.movePlayerTwo({
                positionX: MAX_X - this.props.playerTwo.puckSize,
                velocityX: -this.props.playerTwo.velocityX * 0.75

            })
        }
        // Y-axis borders
        if (this.props.playerTwo.positionY > MAX_Y) {
            this.props.movePlayerTwo({
                positionY: MAX_Y,
                velocityY: -this.props.playerTwo.velocityY * 0.75

            })
        }
        if (this.props.playerTwo.positionY < (0 + this.props.playerTwo.puckSize)) {
            this.props.movePlayerTwo({
                positionY: 0 + this.props.playerTwo.puckSize,
                velocityY: -this.props.playerTwo.velocityY * 0.75

            })
        }
    }

    componentDidUpdate() {
        this.keepPlayerInsideField()
    }

    render() {
        return (
            <Circle
                x={this.props.playerTwo.positionX}
                y={this.props.playerTwo.positionY}
                radius={this.props.playerTwo.puckSize}
                fillPatternImage={this.state.fillPatternImage}
                fillPatternOffset={{ x: 73, y: 74 }}
                stroke={'black'}
                strokeWidth={2}
                mass={this.props.playerTwo.mass}
                velocityX={this.props.playerTwo.velocityX}
                velocityY={this.props.playerTwo.velocityY}
                frictionX={this.props.playerTwo.frictionX}
                frictionY={this.props.playerTwo.frictionY}
                acceleration={this.props.playerTwo.acceleration}
            />
        );
    }

}

const mapStateToProps = state => {
    return {
        playerTwo: state.playerTwo
    }
}


export default connect(mapStateToProps, { movePlayerTwo , movePlayer2})(PlayerTwoContainer)