import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import { Rect, Group, Text } from "react-konva";


class ScoreboardContainer extends PureComponent {


    render() {
        // console.log(this.props.playerOne.positionX)
        return (
            <Group>
                <Rect
                    x={0}
                    y={0}
                    stroke='black'
                    strokeWidth={2}
                    width={500}
                    height={100}
                    fill="blue"
                />
                <Text
                    x={120}
                    y={10}
                    fontSize={20}
                    text='Player 1 Score:'
                    justify='center'
                    width={100}
                />
                <Text
                    x={320}
                    y={10}
                    fontSize={20}
                    text='Player 2 Score:'
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
