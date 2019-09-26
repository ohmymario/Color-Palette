import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Palette from './Palette';
import PaletteList from './PaletteList';

import seedColors from '../assets/seedColors';
import { generatePalette } from '../utils/colorHelpers';


class App extends Component {

  // Return palette passed into routeProps
  findPalette = (id) => (
    seedColors.find(palette => palette.id === id)
  )

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={seedColors} {...routeProps}/>
          )}
        />
        <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          // PASS IN ROUTE PROPS
          <Palette
            palette={generatePalette(
              this.findPalette(routeProps.match.params.id)
              )}
            />
        )}/>
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => <div>SINGLE COLOR PAGE!</div>}
        />
      </Switch>
    );
  }
}

export default App;
