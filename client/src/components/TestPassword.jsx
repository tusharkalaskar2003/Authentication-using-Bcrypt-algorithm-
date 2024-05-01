import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios';

function TestPassword() {

    const [hashedPassword, setHashedPassword] = useState("");
    const [password, setPassword] =  useState("");
    const [tPassword, setTPassword] =  useState("");
    const [hPassword, setHPassword] =  useState("");
    const [input, setInput] = useState("");

    const handleForm = async(e) => {
        e.preventDefault();
        try {
            console.log(password);
            const res = await axios.post("http://localhost:8000/generate-hashed-password", {
                password:password,
            })

            const data = await res.data;
            console.log(data);
            setHashedPassword(data.hashedPassword);

        } catch (error) {
            window.alert("Server error");
        }
    }

    const [message, setMessage] = useState("");
    const handleCopy = () => {
        navigator.clipboard.writeText(hashedPassword);
        setMessage("Copied!");

        setTimeout(()=>{
            setMessage("");
        }, 7000)
    };

    const checkFormHandle = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/chech-password", {
                password: tPassword,
                hashedPassword: hPassword
            })
            console.log("ddd")

            const data = await res.data;
            console.log(data);
            if(res.status === 200){
                setInput("True");
            }
            else if(res.status === 201){
                setInput("False");
            }
            else{
                window.alert("Error, Please try again");
            }
        } catch (error) {
            console.log(error);
            window.alert("Server Error");
        }
    }

    return (
        <div className="main flex">
            <div className="gen-div">
                <p className='para'>Generate Hashed password</p>
                <form className="gen-form" onSubmit={handleForm}>
                    <input type="text" placeholder='Enter password' value={password} onChange={e=>setPassword(e.target.value)}/>
                    <button type='submit'>Generate</button>
                </form>
                <input type="text" placeholder="hashed password" disabled value={hashedPassword}/>
                {
                    hashedPassword?
                    <button onClick={handleCopy}>Copy</button>
                    :
                    <></>
                }
                <p className="green">{message}</p>
            </div>
            <div className="gen-div">
                <p className="para">Check Hashed password</p>
                <form className="gen-form-ano" onSubmit={checkFormHandle}>
                    <input type="text" placeholder='Enter password' value={tPassword} onChange={e=>setTPassword(e.target.value)}/>
                    <input type="text" placeholder='Enter hashed password' value={hPassword} onChange={e=>setHPassword(e.target.value)}/>
                    <button type='submit'>Check</button>
                </form>
                <input type="text" className="an-text" placeholder="True or False" disabled value={input}/>
            </div>
        </div>
    )
}

export default TestPassword
