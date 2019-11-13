import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import NewPaletteForm from './NewPaletteForm';
import PaletteList from './PaletteList';
import Palette from './Palette';
import Page from './Page';
import SingleColorPalette from './SingleColorPalette';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
    this.setState({ palettes: [...this.state.palettes, palette] }, this.syncLocalStorage)
  }

  // Delete Palette
  deletePalette = (id) => {
    this.setState(st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }), this.syncLocalStorage)
  }

  render() {
    return (
      <Route
        render={({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames='page' timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <Page>
                    <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <Page>
                    <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <Page>
                    <Palette
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={(routeProps) => (
                  <Page>
                    <SingleColorPalette
                      {...routeProps}
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </Page>
                )}
              />
            </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    )
  }
}

export default App;
