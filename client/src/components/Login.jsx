import React, { useState } from 'react'
import "./Login.css"

function Login() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterForm = async(e)=>{
    e.preventDefault();
    console.log(username);
    try { 
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          username,
          email,
          password
        )
      })
      console.log(res);

      if(res.status === 200){
        window.alert("User register successfully....");
      }
      else{
        window.alert("Server error");
      }

      
    } catch (error) {
      console.log(error);
      window.alert("Error while registering...");
    }

  }

  return (
    <div class="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <div class="signup">
        <form onSubmit={handleRegisterForm}>
          <label for="chk" aria-hidden="true">Sign up</label>
          <input  type="text" value={username} onChange={(e)=> setUsername(e.target.value)} name="txt" placeholder="User name" required="" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder="Email" required="" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="pswd" placeholder="Password" required="" />
          <button type='submit'>Sign up</button>
        </form>
      </div>
      <div class="login">
        <form>
          <label for="chk" aria-hidden="true">Login</label>
          <input type="email" name="email" placeholder="Email" required="" />
          <input type="password" name="pswd" placeholder="Password" required="" />
          <button>Login</button>
        </form>
      </div>

    </div>
  )
}

export default Login
