import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    background: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  colors: {
    backgroundColor: '#DAE1E4',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative',
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.2rem',
  },
  miniColor: {
    height: 'calc(100% / 4)',
    width: 'calc(100% / 5)',
    position: 'relative',
    // display: 'inline-block',
    // margin: '0 auto',
    // marginBottom: '-3.5px'
  }
}

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
