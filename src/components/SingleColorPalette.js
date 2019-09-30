import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';

export class SingleColorPalette extends Component {

  state = {
    shades: [],
    format: 'hex'
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

  changeColorFormat = (val) => {
    this.setState((st) => {
      return { format: val }
    })
  }

  // Run gatherShades and save to State
  componentDidMount = () => {
    const colors = this.gatherShades(this.props.palette, this.props.colorId)
    this.setState({shades: colors});
  }

  render() {
    const { format, shades } = this.state;
    const { palette: {paletteName, emoji} } = this.props;

    const colorBoxes = shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showLink={false}
      />
    ))

    return (
      <div className ='Palette'>
        <Navbar changeColorFormat={this.changeColorFormat} showingAllColors={false}/>
        <div className ='SinglePalette-colors'>
          {colorBoxes}
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
    )
  }
}

export default SingleColorPalette
