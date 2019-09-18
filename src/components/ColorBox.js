import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './styles/ColorBox.css';


class ColorBox extends Component {

  state = {
    copied: false,
  }

  changeCopyState = () => {
    // Show Growing Popup for 1.5 seconds
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({
        copied: false
      }), 1500)
    })
  }

  render() {

    const { name, background } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={ background } onCopy={this.changeCopyState}>

      {/* Individual Color Box */}
      <div style={{background}} className="ColorBox">

        {/* Growing Color Alert Box*/}
        <div style={{background}} className={`copy-overlay ${copied && 'show'}`}/>
        <div className={`copy-message ${copied && 'show'}`}>
          <h1>Copied</h1>
          <p>{background}</p>
        </div>

        {/* Box Contents */}
        <div className='copy-container'>
          <div className='box-content'>
            <span>{name}</span>
          </div>

          <button className='copy-button'>Copy</button>
        </div>

        <span className='see-more'>More</span>

      </div>

      </CopyToClipboard>
    )
  }
}

export default ColorBox;
