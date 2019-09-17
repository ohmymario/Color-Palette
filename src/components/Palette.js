import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './styles/Palette.css';

class Palette extends Component {

  state = {
    level: 500,
  }

  changeLevel = (level) => {
    this.setState((st) => {
      return {level}
    })
  }

  render() {

    const { palette } = this.props;
    const { level } = this.state;

    const ColorBoxes = palette.colors[level].map(color => (
      <ColorBox background={color.hex} name={color.name}/>
    ))

    return (
      <div className='Palette'>

        <Navbar level={level} changeLevel={this.changeLevel}/>
        {/* Navigation */}

        <div className ='Palette-colors'>
          {ColorBoxes}
        </div>

        {/* Footer */}
      </div>
    )
  }
}

export default Palette;
