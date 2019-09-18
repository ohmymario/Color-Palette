import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import Slider from 'rc-slider';
import MenuItem from '@material-ui/core/MenuItem';

import 'rc-slider/assets/index.css';
import '../components/styles/Navbar.css';

class Navbar extends Component {

  state = {
    format: 'hex'
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({format: value})
    this.props.changeColorFormat(value)
  }

  render() {

    const { level, changeLevel } = this.props;
    const { format } = this.state;

    return (
      <header className='Navbar'>

        <div className='logo'>
          <a href="/">reactcolorpicker</a>
        </div>

        <div className='slider-container'>
          <span>Level: {level}</span>
          <div className='slider'>
            <Slider defaultValue={level}
            min={100}
            max={900}
            step={100}
            onChange={changeLevel}
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
        </div>

        <div className='select-container'>
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value='hex'>HEX - #FFFFFF</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>

      </header>
    )
  }
}


export default Navbar;
