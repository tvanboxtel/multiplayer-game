import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PlayingFieldContainer";
import { movePuck } from '../actions/puck'
import { connect } from 'react-redux'

const 
    initialX = WIDTH / 2,
    initialY = HEIGHT / 2,
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

    keepPuckInsideField  = ()  => {

        // puck does not slow down upon collision.
        // If desired, add slow down multiplier to:
        // -this.props.puck.${velocityDirection} * ${brakeFactor}
        // X-axis borders

        if (this.props.puck.positionX > (MAX_X - this.props.puck.puckSize)) {
            this.props.movePuck({
                positionX : MAX_X - this.props.puck.puckSize,
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
                positionY : 0 + this.props.puck.puckSize,
                velocityY: -this.props.puck.velocityY
            })
        }
    }

    componentDidUpdate() {
        this.keepPuckInsideField()
        this.checkCollision(this.props.playerOne, this.props.puck)
        this.checkCollision(this.props.playerTwo, this.props.puck)

    }

    rotate (x, y, sin, cos, reverse) {
        return {
            x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
            y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
        };
    }
    
    
    checkCollision(Player, Puck) {
        let distanceX = Puck.positionX - Player.positionX,
            distanceY = Puck.positionY - Player.positionY,
        
            // distance between puck and player
            distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY),
        // both puck sizes added together
        addedRadius = Puck.puckSize + Player.puckSize
        // console.log(addedRadius)
        // debugger
    
        //if the distance between the two entities exceeds
        // their combined radius, they have collided!
        if (distance < addedRadius) {
            console.log('We have collided!')
    
            // all collision logic goes here
    
            // we create a sine and cosine
            const angle = Math.atan2(distanceY, distanceX),
                sin = Math.sin(angle),
                cos = Math.cos(angle)
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
