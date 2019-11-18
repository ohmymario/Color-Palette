import React, { Component } from 'react';
import classNames from 'classnames';
import ColorPickerForm from './ColorPickerForm';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';

import DraggableColorList from './DraggableColorList';
import styles from './styles/NewPaletteFormStyles';

import seedColors from '../assets/seedColors';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };

  state = {
    open: true,
    colors: seedColors[0].colors,
    backupColors: seedColors[Math.floor(Math.random() * 8) + 1].colors,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  // Add currentColor + newColorName to colors
  addNewColor = (newColor) => {
    const { colors } = this.state;
    this.setState({ colors: [...colors, newColor] });
  };

  // Change input string to Kebab Case
  toKebabCase = str =>
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.toLowerCase())
      .join('-');


  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (newPalette) => {
    const {emoji, paletteName} = newPalette;
    const { colors } = this.state;

    const Palette = {
      paletteName,
      id: this.toKebabCase(paletteName),
      emoji,
      colors,
    };
    this.props.savePalette(Palette);
    this.props.history.push('/');
  };

  // Reset Palette
  clearColors = () => {
    this.setState({
      colors: [],
    });
  };

  // Add Random color from Pre-Existing Colors
  addRandomColors = () => {

    const { colors, backupColors } = this.state;
    const { palettes } = this.props;

    // Use Backup colors if all palettes deleted
    let allColors = palettes.map(p => p.colors).flat();
    if (allColors.length === 0) allColors = backupColors;

    let randomColor;
    let isDuplicateColor = true;
    while(isDuplicateColor) {
      randomColor = allColors[Math.floor(Math.random() * allColors.length)];
      console.log(randomColor);
      isDuplicateColor = colors.some(color => color.name === randomColor.name)
    }

    this.setState({
      colors: [...colors, randomColor],
    });
  };

  // Remove Individual Color
  removeColor = colorName => {
    const newColors = this.state.colors.filter(
      color => color.name !== colorName
    );
    this.setState({
      colors: newColors,
    });
  };

  // Function for react-sortable-hoc - ENABLES SORT
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {

    const { classes, maxColors, palettes } = this.props;
    const { colors, open } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        {/* TOP NAV */}
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleDrawerOpen={this.handleDrawerOpen}
          handleSubmit={this.handleSubmit}
        />

        {/* LEFT SIDE DRAWER CONTAINER */}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >

          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />

          {/* Drawer Palette Creator */}
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom >Design Your Palette</Typography>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant="contained"
                aria-label="clear"
                color="secondary"
                onClick={this.clearColors}
                >
                Clear Palette
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                aria-label="random"
                color="primary"
                onClick={this.addRandomColors}
                disabled={paletteIsFull}
              >
                Random Color
              </Button>
            </div>

            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <DraggableColorList
            colors={this.state.colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
