import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import NewPaletteForm from './NewPaletteForm';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import seedColors from '../assets/seedColors';
import { generatePalette } from '../utils/colorHelpers';

import './styles/App.css';

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
            <CSSTransition key={location.key} classNames='fade' timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <div className='page'>
                    <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <div className='page'>
                    <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <div className='page'>
                    <Palette
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={(routeProps) => (
                  <div className='page'>
                    <SingleColorPalette
                      {...routeProps}
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </div>
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
