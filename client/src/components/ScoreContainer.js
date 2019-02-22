import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import { Text, Group } from "react-konva";
export const WIDTH = window.innerWidth / 2;
export const HEIGHT = window.innerHeight / 2;


class ScoreboardContainer extends PureComponent {


    render() {
        console.log(this.props.playerOne.positionX)
        return (
            <Group>
            <Text
                x={120}
                y={60}
                fontSize={20}
                text={this.props.playerOne.positionX}
                align="middle"
                verticalAlign='middle'
                justify='center'
                width={100}
            />
            <Text
                x={320}
                y={60}
                fontSize={20}
                text={this.props.playerTwo.positionX}
                justify='center'
                width={100}
            />
            </Group>
        );
    }

}




const mapStateToProps = state => {
    return {
        playerOne: state.playerOne,
        playerTwo: state.playerTwo
    }
}


export default connect(mapStateToProps)(ScoreboardContainer)
