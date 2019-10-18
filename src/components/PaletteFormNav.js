import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


class PaletteFormNav extends Component {
  state = {
    newPaletteName: '',
  };

  componentDidMount = () => {
    const { palettes } = this.props;

    // Compare user palette name against existing palette names for uniqueness
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { newPaletteName } = this.state;
    const { classes, handleSubmit, open, palettes, handleDrawerOpen } = this.props;

    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>

            <ValidatorForm
              onSubmit={() => handleSubmit(newPaletteName)}
              onError={errors => console.log(errors)}
            >
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={newPaletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Name already taken']}
              />

              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>

              <Link to="/">
                <Button variant="contained" color="secondary">
                  Go Back
                </Button>
              </Link>

            </ValidatorForm>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default PaletteFormNav;
