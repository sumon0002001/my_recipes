import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { isButtonElement } from 'react-router-dom';

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();

  const logOut = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth")
    alert("lohout")
  }
    return (
        <div className="navbar">
          <Link to ='/'>Home</Link>
          <Link to ='/createrecipe'>Create Recipes</Link>
          <Link to ='/savedrecipes'>Saved Recipes</Link>
          {!cookies.access_token ? (
            <Link to ='/auth'>Register/Login</Link>
          ): (<button onClick = {logOut}>Logout</button>)}
          
            
        </div>
    )
}

export default Navbar;
