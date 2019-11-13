import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

import Avatar from '@material-ui/core/Avatar';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

class PaletteList extends Component {

  state = {
    openDeleteDialog: false,
    deletingId: '',
  }

  openDialog = (id) => {
    this.setState({
      openDeleteDialog: true,
      deletingId: id,
    });
  }

  closeDialog = () => {
    this.setState({
      openDeleteDialog: false,
      deletingId: '',
    });
  }

  goToPalette = (id) => {
    // this.props.history comes from routeProps(React Router)
    this.props.history.push(`/palette/${id}`)
  }

  handleDelete = () => {
    const { deletePalette } = this.props;
    const { deletingId } = this.state;
    deletePalette(deletingId)
    this.closeDialog()
  }

  render() {
    const { classes, palettes, deletePalette } = this.props;
    const { openDeleteDialog, deletingId } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>

          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition
                key={palette.id}
                timeout={500}
                classNames='fade'>

                <MiniPalette
                  {...palette}
                  goToPalette={this.goToPalette}
                  // deletePalette={deletePalette}
                  openDialog={this.openDialog}
                />

              </CSSTransition>
            ))}
          </TransitionGroup>

        </div>
        <Dialog open={openDeleteDialog} aria-labelledby='delete-dialog-title' onClose={this.closeDialog}>
          <DialogTitle id='delete-dialog-title'>
            Delete This Palette?
          </DialogTitle>
          <List>

          <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar
                style={{
                  backgroundColor: blue[100],
                  color: blue[800]
                }}
                className={classes.avatar}
                >
                  <CheckIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete'/>
            </ListItem>

            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
              <Avatar
                style={{
                  backgroundColor: red[100],
                  color: red[800]
                }}
                className={classes.avatar}
                >
                  <CloseIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Close'/>
            </ListItem>


          </List>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);
