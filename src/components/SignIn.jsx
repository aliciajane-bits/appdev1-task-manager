import { Link, useNavigate } from "react-router-dom"
import {useState} from "react"
import {auth, googleProvider} from "../firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"

function SignIn() {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            alert('Signed in Succesfully')
            navigate('/tasklist')
        } catch (error) {
            setError(error)
            } 
        }

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            alert('Signed in Succesfully')
            navigate('/tasklist')
        } catch (error) {
            setError(error)
        } 
    }

  return (
    <>
      <div className="Sign-In Form">
        <h1>Sign-In Page</h1>
        <form onSubmit = {handleSignIn}>
          <br></br>
          <br></br>
          <input type="email" name="email" id="user_email" placeholder="Enter your email"></input>
          <br></br>
          <br></br>
          <input type="password" name="password" id="username" placeholder="Enter your password"></input>
          <br></br>
          <br></br>
         </form>

         <button onClick = {handleSignInWithGoogle}>"Sign In with Google" </button>
         {error && <p>{error}</p>}
       <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
      
    </>
  )
  
}

export default SignIn