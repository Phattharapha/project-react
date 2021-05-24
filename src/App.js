import React from 'react'
import reactDom from 'react-dom';
import './App.css';

function App() {

const sayHello = () => {
  console.log("hello");
}

  return (
    <div className="App">
      <h1>Hello React</h1>
      <button onClick={sayHello}>Hello</button>
    </div>
  );
}

export default App;
