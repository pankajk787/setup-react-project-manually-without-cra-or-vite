import React from 'react';
import './App.css';
import Child from './Child';
const App = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;
    console.log({ API_URL, API_KEY });
    
  return (
    <main>
        <h1 className='hello'>Hello, React without CRA!</h1>
        <h2 className='wassup'>Wassup?</h2>
        <Child />
    </main>
);
};

export default App;