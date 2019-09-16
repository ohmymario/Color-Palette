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

        <div className='slider'>
          <Slider defaultValue={level}
          min={100}
          max={900}
          step={100}
          onChange={this.changeLevel}
          trackStyle={{ backgroundColor: 'transparent' }}
          railStyle={{ height: '8px' }}
          handleStyle={{
            backgroundColor: 'green',
            outline: 'none',
            border: '2px solid green',
            boxShadow: 'none',
            width: '13px',
            height: '13px',
            marginTop: '-3px',
          }}
          />
        </div>

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
