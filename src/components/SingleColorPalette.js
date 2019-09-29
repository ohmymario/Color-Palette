import React, { Component } from 'react';
import ColorBox from './ColorBox';

export class SingleColorPalette extends Component {

  state = {
    shades: []
  }

  // Return 9 shades from 1 color
  gatherShades = (palette, colorId) => {
    const { colors } = palette;
    let newColors = [];
    Object.keys(colors).forEach((key) => {
      newColors = newColors.concat(
        colors[key].filter(color => color.id === colorId)
      )
    })
    return newColors.slice(1);
  }

  // Run gatherShades and save to State
  componentDidMount = () => {
    const colors = this.gatherShades(this.props.palette, this.props.colorId)
    this.setState({shades: colors});
  }

  render() {
    const colorBoxes = this.state.shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color.hex}
        showLink={false}
      />
    ))

    return (
      <div className ='Palette'>
        <h1>Single Color Palette</h1>
        <div className ='SinglePalette-colors'>
          {colorBoxes}
        </div>
      </div>
    )
  }
}

export default SingleColorPalette
