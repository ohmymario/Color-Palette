import React from 'react';
import styles from './styles/MiniPaletteStyles';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const MiniPalette = (props) => {

  const { classes, paletteName, emoji, colors } = props;

  const miniColorBoxes = colors.map(({color, name}) => (
    <div
      style={{ backgroundColor: color }}
      className={classes.miniColor}
      key={name}
    />
  ))

  return (
    <div className={classes.root} onClick={props.goToPalette}>

      <div className={classes.delete}>
        <DeleteIcon className={classes.deleteIcon}/>
      </div>

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

export default withStyles(styles)(MiniPalette);
