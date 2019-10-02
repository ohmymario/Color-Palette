import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import './styles/Palette.css';

class Palette extends Component {

  state = {
    level: 500,
    format: 'hex'
  }

  changeLevel = (level) => {
    this.setState((st) => {
      return {level}
    })
  }

  changeColorFormat = (val) => {
    this.setState((st) => {
      return { format: val }
    })
  }

  render() {

    const { palette: {paletteName, colors, emoji, id} } = this.props;
    const { level, format } = this.state;
    const ColorBoxes = colors[level].map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        id={color.id}
        key={color.id}
        paletteId={id}
        showingFullPalette={true}
      />
    ))

    return (
      <div className='Palette'>

        <Navbar
          level={level}
          showingAllColors={true}
          changeLevel={this.changeLevel}
          changeColorFormat={this.changeColorFormat}
        />

        <div className ='Palette-colors'>
          {ColorBoxes}
        </div>

        <PaletteFooter paletteName={paletteName} emoji={emoji}/>

      </div>
    )
  }
}

export default Palette;
