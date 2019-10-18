import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';

import DraggableColorList from './DraggableColorList';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
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
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };

  state = {
    open: true,
    currentColor: 'teal',
    newColorName: '',
    colors: this.props.palettes[0].colors,
  };

  componentDidMount = () => {
    // Color Name cannot already exist
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    // Color cannot already exist
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.state.colors.every(({ color }) => color !== this.state.currentColor)
    );
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = newColor => {
    this.setState({
      currentColor: newColor.hex,
    });
  };

  // Add currentColor + newColorName to colors
  addNewColor = () => {
    const { colors, currentColor, newColorName } = this.state;
    const newColor = { name: newColorName, color: currentColor };
    this.setState({ colors: [...colors, newColor], newColorName: '' });
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

  handleSubmit = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      id: this.toKebabCase(newPaletteName),
      colors: this.state.colors,
    };
    this.props.savePalette(newPalette);
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
    const { colors, open, currentColor, newColorName } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        {/* TOP NAV */}
        <PaletteFormNav
          open={open}
          classes={classes}
          palettes={palettes}
          handleDrawerOpen={this.handleDrawerOpen}
          handleSubmit={this.handleSubmit}
        />

        {/* LEFT SIDE DRAWER */}
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

          <Typography variant="h4">Design Your Palette</Typography>

          <div className={classes.drawerBtnContainer}>
            <Button
              variant="contained"
              aria-label="clear"
              color="secondary"
              onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              aria-label="random"
              color="primary"
              onClick={this.addRandomColors}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>

          <ChromePicker
            color={currentColor}
            onChangeComplete={newColor => this.updateCurrentColor(newColor)}
          />

          <ValidatorForm
            ref="form"
            onSubmit={this.addNewColor}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              label="Color Name"
              value={newColorName}
              name="newColorName"
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={[
                'Enter a color name',
                'Color name already used',
                'Color already used',
              ]}
            />
            <Button
              type="submit"
              variant="contained"
              aria-label="add"
              disabled={paletteIsFull}
              style={{ background: paletteIsFull ? 'grey' : currentColor }}
            >
              {paletteIsFull ? 'Palette Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
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
