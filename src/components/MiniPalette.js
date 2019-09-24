import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  main: {
    backgroundColor: 'purple',
    border: '3px solid teal'
  },
  secondary: {
    backgroundColor: 'pink',
    "& h1": {
      color: 'white'
    }
  }
}

const MiniPalette = (props) => {

  const { classes } = props;

  return (
    <div>
      <h1 className={classes.main}>MiniPalette</h1>
      <section className={classes.secondary}>
        <h1>Mini Palette</h1>
      </section>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
