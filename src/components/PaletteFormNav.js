import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import PaletteMetaForm from './PaletteMetaForm';

import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {

  state = {
    formShowing: false
  }

  showForm = () => {
    this.setState({
      formShowing: true
    })
  };

  hideForm = () => {
    this.setState({
      formShowing: false
    })
  };

  render() {
    const { classes, handleDrawerOpen, handleSubmit, open, palettes } = this.props;
    const { formShowing } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {[classes.appBarShift]: open})}
        >

          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, {[classes.hide]: open} )}
            >
              <AddToPhotosIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>Create a Palette</Typography>
          </Toolbar>

          <div className={classes.navBtns}>
            <Link to="/">
              <Button className={classes.button} variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
            <Button className={classes.button} variant="contained" color="primary" onClick={this.showForm}>
              Save
            </Button>
          </div>

        </AppBar>
        {formShowing && (
          <PaletteMetaForm
            handleSubmit={handleSubmit}
            palettes={palettes}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
