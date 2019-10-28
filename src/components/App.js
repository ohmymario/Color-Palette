import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import NewPaletteForm from './NewPaletteForm';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';

import seedColors from '../assets/seedColors';
import { generatePalette } from '../utils/colorHelpers';


class App extends Component {

  static defaultProps = {
    savedPalettes: JSON.parse(localStorage.getItem('palettes'))
  }

  state = {
    palettes: this.props.savedPalettes || seedColors,
  }

  savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))

  syncLocalStorage = () => {
    // Save Palettes to LocalStorage
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  // Return palette passed into routeProps
  findPalette = (id) => this.state.palettes.find(palette => palette.id === id);

  // Save created palette to State
  savePalette = (palette) => {
    this.setState({palettes: [...this.state.palettes, palette]}, this.syncLocalStorage)
  }

  // Delete Palette
  deletePalette = (id) => {
    this.setState(st => ({palettes: st.palettes.filter(palette => palette.id !== id)}), this.syncLocalStorage)

  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps}/>
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps}/>
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
