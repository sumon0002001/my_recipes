import React, {useState} from 'react';
import axios from 'axios';
import { useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    return (
        <div className ="auth">
           <Login/>
           <Registration />
        </div>
    )
}

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post('http://localhost:4000/auth/login', {
                username,
                password
            });
             alert("You are logged in!!")
             setCookies("access_token", result.data.token)
             window.localStorage.setItem("userID",result.data.userID)
             navigate("/")
            
        } catch (error) {
            console.error(error);
        }
    }
    

    return (

      <Form 
        username = {username} 
        setUsername={setUsername} 
        password={password}
        setPassword={setPassword}
        label = "Login"
        onSubmit = {handleSubmit}
      />
    
  
      )
}

const Registration = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:4000/auth/register', {
                username,
                password
            });
            alert("Registration is succesfull! now login pls")
            
        } catch (error) {
            console.error(error);
        }
    }
   return (
     <Form 
       username = {username} 
       setUsername={setUsername} 
       password={password} 
       setPassword={setPassword}
       label = "Registration"
       onSubmit = {handleSubmit}
    />)
}

const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
   return(<div className="auth-container">
   <form action="" onSubmit = {onSubmit}>
<h2>{label}</h2>
       <div className="form-group">
           <label htmlFor="username">Username:</label>
           <input 
             type="text"
             id="username"
             value={username}
             onChange= {(e) => setUsername(e.target.value)}/>

       </div>
       <div className="form-group">
           <label htmlFor="password">Password:</label>
           <input 
             type="password"
             id="password"
            value={password}
             onChange= {(e) => setPassword(e.target.value)}/>

       </div>
       <button type="submit">
           {label}
       </button>
   </form>

</div>) 

}

export default Auth;
