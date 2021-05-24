import React, {useState, useEffect} from 'react'
import './App.css';
import Login from './components/Login'
import auth from './firebase'
function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage:null
  })


  useEffect(() => {
    const handleAuth = auth.onAuthStateChanged(user=>{
      if (user) {
        setSession({
          isLoggedIn: true,
          currentUser: user,
          errorMessage:null
        })
      }
    });
    return () => {
      handleAuth()
    }
  }, [])

   const handleLogout=()=> {
    auth.signOut().then(response => {
      setSession({
        isLoggedIn: false,
        currentUser: null
      })
    })
  }

  return (
    <div className="App">
      {
        session.isLoggedIn ? (<header className="App-header">
        Somthing , 
        <h1> {session.currentUser && session.currentUser.email}</h1>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
        
      </header>) : (<header className="App-header">
        <Login setSession={setSession}/>
      </header>)
      }
      
    </div>
  );
}

export default App;
