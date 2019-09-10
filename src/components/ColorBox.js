import React, { Component } from 'react'
import './styles/ColorBox.css';

class ColorBox extends Component {
  render() {

    const { name, background } = this.props;

    return (
      <div style={{background}} className="ColorBox">
        <span>{name}More</span>
      </div>
    )
  }
}

export default ColorBox;
