import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import DraggableColorBox from './DraggableColorBox';

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
    height: "calc(100vh - 64px)",
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

export class NewPaletteForm extends Component {

  state = {
    open: true,
    currentColor: 'teal',
    newColorName: '',
    colors: [{color: 'blue', name: 'blue'}],
    newPaletteName: ''
  };

  componentDidMount = () => {

    //Color Name cannot already exist
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
      this.state.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    ));

    // Color cannot already exist
    ValidatorForm.addValidationRule('isColorUnique', (value) => (
      this.state.colors.every(({ color }) => color !== this.state.currentColor)
    ));

    // Palette Name cannot already exist
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
      this.props.palettes.every(({ paletteName }) => (
        paletteName.toLowerCase() !== this.state.newPaletteName.toLowerCase()
      ))
    ));
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = (newColor) => {
    this.setState({
      currentColor: newColor.hex
    })
  };

  addNewColor = () => {
    const { colors, currentColor, newColorName } = this.state;
    const newColor = { name: newColorName, color: currentColor }
    this.setState({colors: [...colors, newColor], newColorName: ''})
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value})
  }

  toKebabCase = (str) => (
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-')
  )

  handleSubmit = () => {
    const newColorName = this.state.newPaletteName;
    const newPalette = {
      paletteName: newColorName,
      id: this.toKebabCase(newColorName),
      colors: this.state.colors
    };
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  removeColor = (colorName) => {
    const newColors = this.state.colors.filter(color => color.name !== colorName)
    this.setState({
      colors: newColors
    })
  }

  render() {
    const { classes } = this.props;
    const { open, currentColor, newColorName, newPaletteName } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />

        <AppBar
          position="fixed"
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >

          <Toolbar disableGutters={!open}>

            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>

            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              onError={errors => console.log(errors)}
            >

              <TextValidator
              label="Palette Name"
              name='newPaletteName'
              value={newPaletteName}
              onChange={this.handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter Palette Name', 'Name already taken']}
              />
              <Button
                variant='contained'
                color='primary'
                type='submit'
              >Save Palette</Button>

            </ValidatorForm>


          </Toolbar>

        </AppBar>

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

          <Typography variant='h4' >Design Your Palette</Typography>

          <div>
            <Button
              variant='contained'
              aria-label="clear"
              color='secondary'>
              Clear Palette
            </Button>
            <Button
              variant='contained'
              aria-label="random"
              color='primary'>
              Random Color
            </Button>
          </div>

          <ChromePicker
            color={currentColor}
            onChangeComplete={(newColor) => this.updateCurrentColor(newColor)}
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
                'Color already used'
              ]}
            />
            <Button
              type="submit"
              variant='contained'
              aria-label="add"
              style={{background: currentColor}}
              >
              Add Color
            </Button>
          </ValidatorForm>

        </Drawer>

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          {this.state.colors.map((color) => (
            <DraggableColorBox
              key={color.name}
              color={color}
              handleClick={() => this.removeColor(color.name)}
            />
          ))}

        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
