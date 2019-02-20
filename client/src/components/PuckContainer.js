import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { movePuck } from '../actions/puck'
import { connect } from 'react-redux'

const puckSize = 25,
    initialX = WIDTH / 2,
    initialY = HEIGHT / 2,
    MAX_X = WIDTH,
    MAX_Y = HEIGHT


class Puck extends PureComponent {
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

        this.props.movePuck({ velocityX: this.props.puck.velocityX * this.props.puck.frictionX })
        this.props.movePuck({ velocityY: this.props.puck.velocityY * this.props.puck.frictionY })

        this.props.movePuck({ positionX: this.props.puck.positionX + this.props.puck.velocityX })
        this.props.movePuck({ positionY: this.props.puck.positionY + this.props.puck.velocityY })
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
        // -this.props.puck.${velocityDirection} * ${brakeFactor}
        // X-axis borders

        if (this.props.puck.positionX > (MAX_X - puckSize)) {
            this.props.movePuck({
                positionX : MAX_X - puckSize,
                velocityX: -this.props.puck.velocityX  
            })
        }
        // Y-axis borders
        if (this.props.puck.positionY > MAX_Y) {
            this.props.movePuck({
                positionY: MAX_Y,
                velocityY: -this.props.puck.velocityY
            })
        }
        if (this.props.puck.positionY < (0 + puckSize)) {
            this.props.movePuck({
                positionY : 0 + puckSize,
                velocityY: -this.props.puck.velocityY
            })
        }
    }

    componentDidUpdate() {
        this.keepPuckInsideField()
    }

    render() {
        return (
            <Circle
                x={this.props.puck.positionX}
                y={this.props.puck.positionY}
                radius={puckSize}
                fill={'grey'}
                stroke={'black'}
                strokeWidth={2}
                mass={this.props.puck.mass}
                velocityX={this.props.puck.velocityX}
                velocityY={this.props.puck.velocityY}
                frictionX={this.props.puck.frictionX}
                frictionY={this.props.puck.frictionY}
                acceleration={this.props.puck.acceleration}
            />
        );
    }

}

const mapStateToProps = state => {
    return {
        puck: state.puck
    }
}


export default connect(mapStateToProps, { movePuck })(Puck)
