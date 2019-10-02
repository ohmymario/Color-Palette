import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';

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
      <div style={{background}} className={classes.ColorBox}>

        {/* Growing Color Alert Box*/}
        <div style={{background}} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}/>
        <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
          <h1>Copied</h1>
          <p className={`${classes.textColor}`}>{background}</p>
        </div>

        {/* Box Contents */}
        <div>
          <div className={classes.boxContent}>
            <span className={classes.textColor}>{name}</span>
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
