import React, { Component } from 'react';
import classNames from 'classnames';
import ColorPickerForm from './ColorPickerForm'
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

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },

  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: '100%'
  },
  button: {
    width: '50%'
  },
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };

  state = {
    open: true,
    colors: this.props.palettes[0].colors,
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
      emoji,
      colors,
      id: this.toKebabCase(paletteName),
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

  // Add Random color from Prexisting Colors
  addRandomColors = () => {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    const random = allColors[Math.floor(Math.random() * allColors.length)];
    this.setState({
      colors: [...this.state.colors, random],
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
