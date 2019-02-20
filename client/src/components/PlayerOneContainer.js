import * as React from 'react'
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { Circle } from "react-konva";
import { movePlayer } from '../actions/player'
import { connect } from 'react-redux'

const keys = [],
    MIN_Y = 52,
    MAX_Y = HEIGHT - MIN_Y,
    boardCenterX = WIDTH / 2,
    puckSize = 52;

// export default 
class PlayerOneContainer extends React.Component {
    // state = {
    //     // positionX: WIDTH / 5,
    //     // positionY: HEIGHT / 2,
    //     mass: 15,
    //     velocityX: 0,
    //     velocityY: 0,
    //     frictionX: 1,
    //     frictionY: 1,
    //     acceleration: 1
    // };

    move = () => {

        this.setState({ velocityX: this.props.playerOne.velocityX * this.props.playerOne.frictionX })
        this.setState({ velocityY: this.props.playerOne.velocityY * this.props.playerOne.frictionY })


        this.setState({ positionX: this.props.playerOne.positionX + this.props.playerOne.velocityX })
        this.setState({ positionY: this.props.playerOne.positionY + this.props.playerOne.velocityY })
    }

    moveController = (event) => {

        keys[event.keyCode] = true

        // Up
        if (keys[87]) {
            if (this.props.playerOne.positionY > 0 + puckSize) {
                this.setState({ velocityY: this.props.playerOne.velocityY - this.props.playerOne.acceleration })
                this.move()
            } else {
                this.setState({ velocityY: 0, velocityX: 0 })
            }
        }

        // // Down
        if (keys[83]) {
            if (this.props.playerOne.positionY < MAX_Y) {
                this.setState({ velocityY: this.props.playerOne.velocityY + this.props.playerOne.acceleration })
                this.move()
                movePlayer()

            } else {
                this.setState({ velocityY: 0, velocityX: 0 })
            }
        }

        // Right
        if (keys[68]) {
            if (this.props.playerOne.positionX < boardCenterX - puckSize) {
                this.props.movePlayer({ velocityX: this.props.playerOne.velocityX + this.props.playerOne.acceleration })
                this.move()
            } else {
                this.setState({ velocityX: 0, velocityY: 0 })
            }
        }

        // Left, decrease acceleration
        if (keys[65]) {
            if (this.props.playerOne.positionX > 0 + puckSize) {
                this.setState({ velocityX: this.props.playerOne.velocityX - this.props.playerOne.acceleration })
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
        if (this.props.playerOne.positionX > (boardCenterX - puckSize)) {
            this.setState({
                positionX: boardCenterX - puckSize,
                velocityX: -this.props.playerOne.velocityX * 0.75
            })
        }

        if (this.props.playerOne.positionX < (0 + puckSize)) {
            this.setState({
                positionX: 0 + puckSize,
                velocityX: -this.props.playerOne.velocityX * 0.75
            })
        }
        // Y-axis borders
        if (this.props.playerOne.positionY > MAX_Y) {
            this.setState({
                positionY: MAX_Y,
                velocityY: -this.props.playerOne.velocityY * 0.75
            })
        }
        if (this.props.playerOne.positionY < (0 + puckSize)) {
            this.setState({
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
    console.log(state)
    return {
        playerOne: state.playerOne
    }
}


export default connect(mapStateToProps, { movePlayer })(PlayerOneContainer)