import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
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
        <Route exact path="/" render={() => <h1>Palette List Goes Here</h1> }/>
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
      </Switch>
    );
  }
}

export default App;
