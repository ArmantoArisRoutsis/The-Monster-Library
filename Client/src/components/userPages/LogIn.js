import React,{useState} from 'react'

import "./LogIn.css"
import axios from "axios"

const LogIn = () => {

    const [formInfo,setFormInfo] = useState({
        email:"",
        password:""
    })

    const {email,password} = formInfo

    const handleSubmit =(e)=>{
    e.preventDefault()
    axios.post("https://the-monster-library.herokuapp.com/login",formInfo)
    // axios.post("http://localhost:2000/login",formInfo)
    .then(response => {
      console.log(response)
      console.log(response.data)
    })
    .catch(error => {console.log(error)})
    // history.push("/fechedmons")
    }
    
  


    const handleEmail = (e) =>{
        setFormInfo({...formInfo,email: e.target.value});
    }
    const handlePassword = (e) =>{
        setFormInfo({...formInfo,password: e.target.value});
    }

    return (
        <>
            <h1>Log In Page!</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} type="text" id="email" name="email" onChange={handleEmail}/>
                <input value={password} type="text" id="password" name="password" onChange={handlePassword}/>
                <button type="submit">Log In</button>
            </form>
        </>   
    )
}

export default LogIn
