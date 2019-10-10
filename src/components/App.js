import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import NewPaletteForm from './NewPaletteForm';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';

import seedColors from '../assets/seedColors';
import { generatePalette } from '../utils/colorHelpers';


class App extends Component {

  state = {
    palettes: seedColors
  }

  // Return palette passed into routeProps
  findPalette = (id) => this.state.palettes.find(palette => palette.id === id);

  // Save created palette to State
  savePalette = (palette) => {
    this.setState({ palettes: [...this.state.palettes, palette] })
    // console.log(`APP ${JSON.stringify(palette)}`)
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={this.state.palettes} {...routeProps}/>
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm savePalette={this.savePalette} {...routeProps}/>
          )}
        />
        <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            palette={generatePalette(
              this.findPalette(routeProps.match.params.id)
              )}
            />
        )}/>
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
            {...routeProps}
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
