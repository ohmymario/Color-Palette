import React from 'react';
import Palette from './Palette';
import seedColors from '../assets/seedColors';

function App() {
  return (
    <div>
      <Palette {...seedColors[2]} />
    </div>
  );
}

export default App;
