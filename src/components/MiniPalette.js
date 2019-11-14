import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles/MiniPaletteStyles';

export class MiniPalette extends PureComponent {

  state = {}

  deletePalette = (e) => {
    const {id, openDialog} = this.props;

    // Delete Palette function from parent palette
    e.stopPropagation()
    openDialog(id)
  }

  handleClick = () => {
    const { id, goToPalette } = this.props;
    goToPalette(id);
  }

  render() {

    const { classes, paletteName, emoji, colors } = this.props;

    const miniColorBoxes = colors.map(({ color, name }) => (
        <div
          style={{ backgroundColor: color }}
          className={classes.miniColor}
          key={name}
        />
      ))

    return (
      <div className={classes.root} onClick={this.handleClick}>

        <DeleteIcon
          className={classes.deleteIcon}
          onClick={this.deletePalette}
        />

        <div className={classes.colors}>
          {miniColorBoxes}
        </div>

        <h5 className={classes.title}>
          {paletteName}
          <span className={classes.emoji}>{emoji}</span>
        </h5>

      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);