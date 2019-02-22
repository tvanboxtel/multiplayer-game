import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import { Rect, Group } from "react-konva";

const scoreURL = 'https://i.imgur.com/fizcCwD.jpg'

class ScoreboardContainer extends PureComponent {

    constructor(...args) {
        super(...args);
        const image = new window.Image()
        image.onload = () => {
          this.setState({
            fillPatternImage: image
          })
        }
        image.src = scoreURL
        this.state = {
          color: 'green',
          fillPatternImage: null
        }
      }

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
                    height={150}
                    fillPatternImage={this.state.fillPatternImage}
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
