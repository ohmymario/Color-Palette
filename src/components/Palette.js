import React, { Component } from 'react';
import './styles/Palette.css';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
        <Slider defaultValue={level}
        min={100}
        max={900}
        step={100}
        onChange={this.changeLevel}
        />
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
