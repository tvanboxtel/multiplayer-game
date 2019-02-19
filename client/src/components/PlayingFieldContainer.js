import React, { PureComponent } from "react";
import { Group, Rect } from "react-konva";
// does not resize on window size change
export const WIDTH = window.innerWidth / 2;
export const HEIGHT = window.innerHeight / 2;


export default class PlayingFieldContainer extends PureComponent {

  // state = {
  //   image: null
  // }

  // componentDidMount = () => {
  //   this.setImage()
  // }

  // setImage() {
  //   const image = new window.Image()
  //   image.src = 'https://imgur.com/gallery/dmLAJX2'
  //   image.onload = () => {
  //     this.setState({
  //       image: image
  //     })
  //   }
  // }

  render() {

    return (

      <Group>
        <Rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill="rgb(0,0,0)"
          shadowBlur={2}
        />
        <Rect
          x={2}
          y={2}
          width={WIDTH - 4}
          height={HEIGHT - 4}
          fill="white"
          // image={this.state.image}
        />
      </Group>


    );
  }
}


// const image = new window.Image()
// image.onload = () => {
//   this.setState({
//     fillPatternImage: image
//   })
// }
// image.src = 'http://i.imgur.com/A6H6xHF.png';
// this.state = {
//   color: 'green',
//   fillPatternImage: null
// };
