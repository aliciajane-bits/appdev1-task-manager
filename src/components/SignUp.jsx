import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { Link } from "react-router-dom"
import { useState } from "react"


function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            alert('User created successfully')
            setEmail('')
            setPassword('')
        } catch (error) {
            setError(error)
        }
    }

    return (
        <>
            <div className="Sign-In Form">
                <h1>Sign-Up Page</h1>
                <form onSubmit = {handleSignUp}>
                    <br></br>
                    <br></br>
                    <input type="email"  placeholder="user@email.com" onChange={(e) => {setEmail(e.target.value)}} required></input>
                    <br></br>
                    <br></br>
                    <input type="password"  placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required ></input>
                    <br></br>
                    <br></br>
                </form>

                {error && <p>{error}</p>}
                 <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    
          </div>
          
        </>
     )

 }

 export default SignUp
