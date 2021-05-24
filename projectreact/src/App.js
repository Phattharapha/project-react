import React, {useState} from 'react'
import './App.css';
import Login from './components/Login'

function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage:null
  })

  return (
    <div className="App">
      {
        session.isLoggedIn ? (<header className="App-header">
        Somthing
      </header>) : (<header className="App-header">
        <Login/>
      </header>)
      }
      
    </div>
  );
}

export default App;
