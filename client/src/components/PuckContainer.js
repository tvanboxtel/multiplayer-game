import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { movePuck, puckHitGoalOne, puckHitGoalTwo, resetPuck } from '../actions/puck'
import { connect } from 'react-redux'

const
    MAX_X = WIDTH,
    MAX_Y = HEIGHT


class Puck extends PureComponent {

    move = () => {

        this.props.movePuck({
            positionX: this.props.puck.positionX + this.props.puck.velocityX,
            positionY: this.props.puck.positionY + this.props.puck.velocityY,
            velocityX: this.props.puck.velocityX * this.props.puck.frictionX,
            velocityY: this.props.puck.velocityY * this.props.puck.frictionY
        })
    }

    componentDidMount() {
        this.animate()
    }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.move()
    }

    keepPuckInsideField = () => {

        if (this.props.puck.positionX > (MAX_X - this.props.puck.puckSize)) {
            this.props.movePuck({
                positionX: MAX_X - this.props.puck.puckSize,
                velocityX: -this.props.puck.velocityX
            })
        }

        if ((this.props.puck.positionX > (MAX_X - this.props.puck.puckSize))
            && (this.props.puck.positionY > (MAX_Y / 3) - this.props.puck.puckSize)
            && (this.props.puck.positionY < (MAX_Y / 3 * 2) - this.props.puck.puckSize)) {

            this.scoredGoalTwo(this.props.playerTwo.score + 1)
            this.resetPuckPosition(
                this.props.puck.positionX = WIDTH / 2,
                this.props.puck.positionY = HEIGHT / 2,
                this.props.puck.velocityX = 0,
                this.props.puck.velocityY = 0,
            )

        }

        if (this.props.puck.positionX < (0 + this.props.puck.puckSize)) {
            this.props.movePuck({
                positionX: 0 + this.props.puck.puckSize,
                velocityX: -this.props.puck.velocityX
            })
        }

        if ((this.props.puck.positionX < (0 + this.props.puck.puckSize))
            && (this.props.puck.positionY > (MAX_Y / 3) - this.props.puck.puckSize)
            && (this.props.puck.positionY < (MAX_Y / 3 * 2) - this.props.puck.puckSize)) {

            this.scoredGoalOne(this.props.playerOne.score + 1)
            this.resetPuckPosition(
                this.props.puck.positionX = WIDTH / 2,
                this.props.puck.positionY = HEIGHT / 2,
                this.props.puck.velocityX = 0,
                this.props.puck.velocityY = 0,
            )
        }

        // Y-axis borders
        if (this.props.puck.positionY > MAX_Y - this.props.puck.puckSize) {
            this.props.movePuck({
                positionY: MAX_Y - this.props.puck.puckSize,
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

    scoredGoalOne = (score) => {
        this.props.puckHitGoalOne(score)
    }

    scoredGoalTwo = (score) => {
        this.props.puckHitGoalTwo(score)
    }

    resetPuckPosition = (positionX, positionY, velocityX, velocityY) => {
        this.props.resetPuck(positionX, positionY, velocityX, velocityY)
    }

    rotate(positionX, positionY, sin, cos, reverse) {
        return {
            positionX: (reverse) ? (positionX * cos + positionY * sin)
                : (positionX * cos - positionY * sin),

            positionY: (reverse) ? (positionY * cos - positionX * sin)
                : (positionY * cos + positionX * sin)
        };
    }


    checkCollision(puck, player) {
        const distanceX = player.positionX - puck.positionX,
            distanceY = player.positionY - puck.positionY,
            distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY),
            addedRadius = player.puckSize + puck.puckSize


        if (distance < addedRadius) {
            let angle = Math.atan2(distanceY, distanceX),
                sin = Math.sin(angle),
                cos = Math.cos(angle),

                positionPuck = { positionX: 0, positionY: 0 },
                positionPlayer = this.rotate(distanceX, distanceY, sin, cos, true),
                velocityPuck = this.rotate(puck.velocityX, puck.velocityY, sin, cos, true),
                velocityPlayer = this.rotate(player.velocityX, player.velocityY, sin, cos, true),
                velocityTotal = velocityPuck.positionX - velocityPlayer.positionX;

            velocityPuck.positionX = ((puck.mass - player.mass) * velocityPuck.positionX + 2 * player.mass * velocityPlayer.positionX) /
                (puck.mass + player.mass);
            velocityPlayer.positionX = velocityTotal + velocityPuck.positionX;

            let absV = Math.abs(velocityPuck.positionX) + Math.abs(velocityPlayer.positionX),
                overlap = (puck.puckSize + player.puckSize) - Math.abs(positionPuck.positionX - positionPlayer.positionX);


            positionPuck.positionX += velocityPuck.positionX / absV * overlap;
            positionPlayer.positionX += velocityPlayer.positionX / absV * overlap

            let positionPuckForce = this.rotate(positionPuck.positionX, positionPuck.positionY, sin, cos, false),
                positionPlayerForce = this.rotate(positionPlayer.positionX, positionPlayer.positionY, sin, cos, false);

            player.positionX = puck.positionX + positionPlayerForce.positionX;
            player.positionY = puck.positionY + positionPlayerForce.positionY;

            puck.positionX = puck.positionX + positionPuckForce.positionX;
            puck.positionY = puck.positionY + positionPuckForce.positionY

            let velocityPuckForce = this.rotate(velocityPuck.positionX, velocityPuck.positionY, sin, cos, false);
            let velocityPlayerForce = this.rotate(velocityPlayer.positionX, velocityPlayer.positionY, sin, cos, false);

            puck.velocityX = velocityPuckForce.positionX;
            puck.velocityY = velocityPuckForce.positionY;

            player.velocityX = velocityPlayerForce.positionX;
            player.velocityY = velocityPlayerForce.positionY;
        }
    }

    render() {
        return (
            <Circle
                x={this.props.puck.positionX}
                y={this.props.puck.positionY}
                radius={this.props.puck.puckSize}
                fill='rgb(31,31,31)'
                stroke='rgb(57,57,57)'
                strokeWidth={5}
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


export default connect(mapStateToProps, { movePuck, puckHitGoalOne, puckHitGoalTwo, resetPuck })(Puck)
