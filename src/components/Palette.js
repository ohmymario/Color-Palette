import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import './styles/Palette.css';

const styles = {
  Palette: {
    height: '100vh',
    overflow: 'hidden',
  },
  PaletteColors: {
    height: '90%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  PaletteFooter: {
    backgroundColor: 'white',
    height: '4vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: '1.5rem',
    margin: '0 1rem',
  },
  SinglePaletteColors: {
    height: '90%',
    display: 'flex',
    flexWrap: 'wrap',
  }
}

class Palette extends Component {

  state = {
    level: 500,
    format: 'hex'
  }

  changeLevel = (level) => {
    this.setState((st) => {
      return {level}
    })
  }

  changeColorFormat = (val) => {
    this.setState((st) => {
      return { format: val }
    })
  }

  render() {

    const { palette: {paletteName, colors, emoji, id}, classes } = this.props;
    const { level, format } = this.state;
    const ColorBoxes = colors[level].map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        id={color.id}
        key={color.id}
        paletteId={id}
        showingFullPalette={true}
      />
    ))

    return (
      <div className={classes.Palette}>

        <Navbar
          level={level}
          showingAllColors={true}
          changeLevel={this.changeLevel}
          changeColorFormat={this.changeColorFormat}
        />

        <div className ={classes.PaletteColors}>
          {ColorBoxes}
        </div>

        <PaletteFooter paletteName={paletteName} emoji={emoji}/>

      </div>
    )
  }
}

export default withStyles(styles)(Palette);
