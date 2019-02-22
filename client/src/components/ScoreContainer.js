import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import { Text, Group } from "react-konva";


class ScoreboardContainer extends PureComponent {


    render() {
        return (
            <Group>
            <Text

                x={108}
                y={55}
                fontSize={30}
                fill='white'
                fontFamily='Russo One'
                text={this.props.playerOneScore}
                align="middle"
                verticalAlign='middle'
                justify='center'
                width={100}
            />
            <Text

                x={362}
                y={55}
                fontSize={30}
                fill='white'
                fontFamily='Russo One'
                text={this.props.playerTwoScore}

                justify='center'
                width={100}
            />
            </Group>
        );
    }

}




const mapStateToProps = state => {
    // console.log(state)
    return {
        playerOneScore: state.playerOne.score,
        
        playerTwoScore: state.playerTwo.score
    }
}


export default connect(mapStateToProps)(ScoreboardContainer)
