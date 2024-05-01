import React, { useState } from 'react'
import "./Login.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegisterForm = async(e)=>{
    e.preventDefault();
    try { 
      const res = await axios.post("http://localhost:8000/register", {
          username: username,
          email: email,
          password: password
      })
      const data = await res.data;
      console.log(data);

      if(res.status === 200){
        window.alert("User register successfully....");
        setUsername("");
        setEmail("");
        setPassword("");
      }
      else{
        window.alert("Server error");
      }
    } catch (error) {
      console.log(error);
      window.alert("Error while registering...");
    }
  }

  const handleLoginForm = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:8000/login", {
        email,
        password
      })

      if(res.status === 200){
        window.alert("login successfully");
      }
      else{
        window.alert("Invalid credentials");
      }

    } catch (error) {
      window.alert("Serve Error!");
    }
  }

  const handleOnClick = ()=>{
    navigate("/test-password");
  }

  return (
    <>
    <div className="main login-page">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <div className="signup">
        <form onSubmit={handleRegisterForm}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input  type="text" value={username} onChange={(e)=> setUsername(e.target.value)} name="txt" placeholder="User name" required="" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder="Email" required="" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="pswd" placeholder="Password" required="" />
          <button type='submit'>Sign up</button>
        </form>
      </div>
      <div className="login">
        <form onSubmit={handleLoginForm}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input type="email" name="email" placeholder="Email" required="" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" name="pswd" placeholder="Password" required="" value={password} onChange={e => setPassword(e.target.value)} />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
      <button onClick={handleOnClick}>Test Password</button>
    </>
  )
}

export default Login
