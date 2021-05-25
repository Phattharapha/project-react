import React,{useState} from 'react'

import auth from '../firebase'

const Logout = () => {

const [setSession] = useState({
  isLoggedIn: false,
  currentUser: null,
  errorMessage:null
})

const handleLogout=()=> {
  auth.signOut().then(response => {
    setSession({
      isLoggedIn: false,
      currentUser: null
    })
  })
}

 return (
   <div>
    <button type="button" class="btn btn-dark" onClick={handleLogout}>
          Logout
        </button>     
   </div>
 )
 }

export default Logout
