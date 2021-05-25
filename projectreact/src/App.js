import React, {useState, useEffect} from 'react'
import './App.css';
import Login from './components/Login'
import auth from './firebase'
import store from './firebase/store'

function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage:null
  })

  const [info, setInfo] = useState([])
  const [loading,setLoading] = useState(false)

  const ref = store.firestore().collection("infomation")

  function getInfo(){
    setLoading(true)
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      })
      setInfo(items)
      setLoading(false)
    })
  }

  useEffect(() => {
    getInfo();
    }, [])

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

  if (loading) {
    return <p> Loading... </p>
  }

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
        session.isLoggedIn ? (<form>
          <nav class="navbar navbar-expand">         
          <div class="container-fluid">
            <button type="button" class="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button></div></nav>
        <h2>Hello !!! ,</h2> 
        <h1> {session.currentUser && session.currentUser.email}</h1>
        <br></br>
        <h2>Information</h2><br></br>

        {info.map((info) => (
          <div class="container px-4 border" key={info.id}>
            <h3> Name: {info.name}</h3>
            <p> Address: {info.address}</p>
          </div>
        ))}
        
      </form>) : (<header className="App-header">
        <Login setSession={setSession}/>
      </header>)
      }
      
    </div>
  );
}

export default App;
