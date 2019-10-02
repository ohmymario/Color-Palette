import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';

const styles = {
  Palette: {
    height: '100vh',
    overflow: 'hidden',
  },
  SinglePaletteColors: {
    height: '90%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  goBack: {
    backgroundColor: 'black',
    width: '20%',
    height: '50%',
    position: 'relative',
    cursor: 'pointer',
    '& a': {
      color: 'white',
      border: 'none',
      background: 'rgba(255, 255, 255, 0.3)',
      position: 'absolute',
      width: '100px',
      height: '30px',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      marginLeft: '-50px',
      marginTop: '-15px',
      textAlign: 'center',
      outline: 'none',
      fontSize: '1rem',
      lineHeight: '30px',
      textTransform: 'uppercase',
      textDecoration: 'none',
    }
  }
}

export class SingleColorPalette extends Component {

  state = {
    shades: [],
    format: 'hex'
  }

  // Return 9 shades from 1 color
  gatherShades = (palette, colorId) => {
    const { colors } = palette;
    let newColors = [];
    Object.keys(colors).forEach((key) => {
      newColors = newColors.concat(
        colors[key].filter(color => color.id === colorId)
      )
    })
    return newColors.slice(1);
  }

  changeColorFormat = (val) => {
    this.setState((st) => {
      return { format: val }
    })
  }

  // Run gatherShades and save to State
  componentDidMount = () => {
    const colors = this.gatherShades(this.props.palette, this.props.colorId)
    this.setState({shades: colors});
  }

  render() {
    const { format, shades } = this.state;
    const { palette: {paletteName, emoji, id}, classes } = this.props;

    const colorBoxes = shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ))

    return (
      <div className={classes.Palette}>
        <Navbar changeColorFormat={this.changeColorFormat} showingAllColors={false}/>
        <div className={classes.SinglePaletteColors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link
              to={`/palette/${id}`}
              className='back-button'>
              Go Back
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPalette);
