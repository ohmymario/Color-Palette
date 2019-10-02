import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import './styles/ColorBox.css';

const styles = {
  ColorBox: {
    width: '20%',
    height: props => props.showingFullPalette ? '25%': '50%',
    // margin: '0 auto',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background 0.48s ease',
    // display: 'inline-block',
    // marginBottom: '-3.5px',
    '&:hover $copyButton': {
      opacity: 1,
      transition: '0.5s',
    },
  },
  textColor: {
    color: props => chroma.contrast(props.background, "black") < 6 ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)'
  },
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
  /* Sizing */
  position: 'absolute',
  width: '100px',
  height: '30px',
  display: 'inline-block',
  /* Offset to center button */
  marginLeft: '-50px',
  marginTop: '-15px',
  top: '50%',
  left: '50%',
  /* Visual */
  border: 'none',
  background: 'rgba(255, 255, 255, 0.3)',
  fontSize: '1rem',
  lineHeight: '30px',
  textAlign: 'center',
  textTransform: 'uppercase',
  textDecoration: 'none',
  outline: 'none',
  opacity: '0',
  }
}

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
    const { background, id, name, paletteId, showingFullPalette, classes } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={ background } onCopy={this.changeCopyState}>

      {/* Individual Color Box */}
      <div style={{background}} className={`${classes.ColorBox}`}>

        {/* Growing Color Alert Box*/}
        <div style={{background}} className={`copy-overlay ${copied && 'show'}`}/>
        <div className={`copy-message ${copied && 'show'}`}>
          <h1>Copied</h1>
          <p className={`${classes.textColor}`}>{background}</p>
        </div>

        {/* Box Contents */}
        <div className='copy-container'>
          <div className='box-content'>
            {/* <span className={contrast ? 'white-text' : null}>{name}</span> */}
            <span className={`${classes.textColor}`}>{name}</span>
          </div>
          <button className={`${classes.copyButton} ${classes.textColor}`}>Copy</button>
        </div>

        {showingFullPalette && (
          /* prevent copystate and animation */
          <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
            <span className={`${classes.seeMore} ${classes.textColor}`}>More</span>
          </Link>
        )}

      </div>
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(ColorBox);
