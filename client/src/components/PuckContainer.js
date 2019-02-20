import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { movePuck } from '../actions/puck'
import { connect } from 'react-redux'

const
    // no longer needed?
    // initialX = WIDTH / 2,
    // initialY = HEIGHT / 2,
    MAX_X = WIDTH,
    MAX_Y = HEIGHT


class Puck extends PureComponent {

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

    keepPuckInsideField = () => {

        // puck does not slow down upon collision.
        // If desired, add slow down multiplier to:
        // -this.props.puck.${velocityDirection} * ${brakeFactor}
        // X-axis borders

        if (this.props.puck.positionX > (MAX_X - this.props.puck.puckSize)) {
            this.props.movePuck({
                positionX: MAX_X - this.props.puck.puckSize,
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
        if (this.props.puck.positionY < (0 + this.props.puck.puckSize)) {
            this.props.movePuck({
                positionY: 0 + this.props.puck.puckSize,
                velocityY: -this.props.puck.velocityY
            })
        }
    }

    componentDidUpdate() {
        this.keepPuckInsideField()
        this.checkCollision(this.props.playerOne, this.props.puck)
        this.checkCollision(this.props.playerTwo, this.props.puck)

    }

    rotate(x, y, sin, cos, reverse) {
        return {
            x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
            y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
        };
    }


    checkCollision(puck, player) {
        const distanceX = player.positionX - puck.positionX,
            distanceY = player.positionY - puck.positionY,
            distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY),
            addedRadius = player.puckSize + puck.puckSize

        //if the distance between the two entities exceeds
        // their combined radius, they have collided!
        if (distance < addedRadius) {
            // all collision logic goes here    
            let angle = Math.atan2(distanceY, distanceX),
                sin = Math.sin(angle),
                cos = Math.cos(angle),

                positionPuck = { x: 0, y: 0 },
                positionPlayer = this.rotate(distanceX, distanceY, sin, cos, true),
                velocityPuck = this.rotate(puck.velocityX, puck.velocityY, sin, cos, true),
                velocityPlayer = this.rotate(player.velocityX, player.velocityY, sin, cos, true),
                velocityTotal = velocityPuck.x - velocityPlayer.x;
                console.log(velocityTotal)
                debugger
            // Currently always returns zero because the puck's initial velocity IS zero
            // velocityPuck.x = ((puck.mass - player.mass) * velocityPuck.x + 2 * player.mass * velocityPlayer.x) /
            //     (puck.mass + player.mass);
            // velocityPlayer.x = velocityTotal + velocityPuck.x;

            // let absV = Math.abs(velocityPuck.x) + Math.abs(velocityPlayer.x),
            //     overlap = (puck.puckSize + player.puckSize) - Math.abs(positionPuck.x - positionPlayer.x);

            // positionPuck.x += velocityPuck.x / absV * overlap;
            // positionPlayer.x += velocityPlayer.x / absV * overlap

            // let positionPuckF = this.rotate(positionPuck.x, positionPuck.y, sin, cos, false),
            //     positionPlayerF = this.rotate(positionPlayer.x, positionPlayer.y, sin, cos, false);

           

        }
    }

    render() {
        return (
            <Circle
                x={this.props.puck.positionX}
                y={this.props.puck.positionY}
                radius={this.props.puck.puckSize}
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
        puck: state.puck,
        playerOne: state.playerOne,
        playerTwo: state.playerTwo
    }
}


export default connect(mapStateToProps, { movePuck })(Puck)
