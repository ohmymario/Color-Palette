import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
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

    const { background, id, name, paletteId, showLink } = this.props;
    const { copied } = this.state;
    const contrast = chroma.contrast(background, "black") < 6;

    return (
      <CopyToClipboard text={ background } onCopy={this.changeCopyState}>

      {/* Individual Color Box */}
      <div style={{background}} className='ColorBox'>

        {/* Growing Color Alert Box*/}
        <div style={{background}} className={`copy-overlay ${copied && 'show'}`}/>
        <div className={`copy-message ${copied && 'show'}`}>
          <h1>Copied</h1>
          <p className={!contrast ? 'dark-text' : null}>{background}</p>
        </div>

        {/* Box Contents */}
        <div className='copy-container'>
          <div className='box-content'>
            <span className={contrast ? 'white-text' : null}>{name}</span>
          </div>
          <button className={`copy-button ${!contrast ? 'dark-text' : null}`}>Copy</button>
        </div>

        {showLink && (
          /* prevent copystate and animation */
          <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
            <span className={`see-more ${!contrast ? 'dark-text' : null}`}>More</span>
          </Link>
        )}

      </div>
      </CopyToClipboard>
    )
  }
}

export default ColorBox;
