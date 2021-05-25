 import React,{useState} from 'react'

 import auth from '../firebase'

const Login = ({ setSession }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async() => {
    try {
      const response =await auth.signInWithEmailAndPassword(username, password);
    
      const {user} = response;

      setSession({
        isLoggedIn: true,
        currentUser: user
      })

    } catch (error) {
      setSession({
        isLoggedIn: false,
        currentUser: null,
        errorMessage: error.message
      })
    }
        
  }

  const handleUsername = event => {
    setUsername(event.target.value)
  }

  const handlePassword = event => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <form>
      <fieldset>
      <legend>LOGIN</legend>
        <div class="mb-3">
          <label class="form-label">Email </label> <br></br>
          <input type="email"  placeholder="Email" onChange={handleUsername} />
        </div>
        <div class="mb-3">
          <label class="form-label">Password </label> <br></br>
          <input type="password" placeholder="Password" onChange={handlePassword}/>
        </div>
        
      <button type="button" class="btn btn-primary" onClick={handleLogin}>Login</button>
      </fieldset>
      </form>      
    </div>
  )
}

export default Login
