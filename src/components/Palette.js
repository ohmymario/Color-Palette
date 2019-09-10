import React, { Component } from 'react';
import './styles/Palette.css';
import ColorBox from './ColorBox';

class Palette extends Component {
  render() {

    const ColorBoxes = this.props.colors.map(color => (
      <ColorBox background={color.color} name={color.name}/>
    ))

    return (
      <div className='Palette'>
      {/* Navigation */}
      <div className ='Palette-colors'>
        {ColorBoxes}
        {/* Color Boxes */}
      </div>
      {/* Footer */}
    </div>
    )
  }
}

export default Palette;
