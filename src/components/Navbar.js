import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NavbarStyles';

class Navbar extends Component {

  state = {
    format: 'hex',
    open: false,
  }

  static defaultProps = {
    level: 500,
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({format: value, open: true})
    this.props.changeColorFormat(value)
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {

    const { level, changeLevel, showingAllColors, classes } = this.props;
    const { format, open } = this.state;

    return (
      <header className={classes.Navbar}>

        <div className={classes.logo}>
          <Link to='/'>reactcolorpicker</Link>
        </div>

        {showingAllColors && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
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
        )}

        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value='hex'>HEX - #FFFFFF</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          message={<span id='message-id'>Format Changed To {format.toUpperCase()}</span>}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          onClose={this.handleClose}
          action={[
            <IconButton
            onClick={this.handleClose}
            key='close'
            color='inherit'
            aria-label='close'
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

      </header>
    )
  }
}


export default withStyles(styles)(Navbar);
