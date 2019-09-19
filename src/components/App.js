import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from '../assets/seedColors';
import { generatePalette } from '../utils/colorHelpers';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>Palette List Goes Here</h1> }/>
        <Route exact path="/palette/:id"render={() => <Palette palette={generatePalette(seedColors[4])} />}/>
      </Switch>


      // <div>
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
