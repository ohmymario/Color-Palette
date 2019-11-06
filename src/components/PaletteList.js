import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {

  goToPalette = (id) => {
    // this.props.history comes from routeProps(React Router)
    this.props.history.push(`/palette/${id}`)
  }

  render() {
    const { classes, palettes, deletePalette } = this.props;

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
                  goToPalette={() => this.goToPalette(palette.id)}
                  deletePalette={deletePalette}
                />

              </CSSTransition>
            ))}
          </TransitionGroup>

        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);
