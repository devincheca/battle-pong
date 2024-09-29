import React from 'react';
import nextMove from './src/services/tfRecommendation';

function App() {
  console.log('nextMove: ', nextMove());
  return (
    <div>
      <h1>Hello, React with Parcel.js</h1>
    </div>
  );
}

export default App;

