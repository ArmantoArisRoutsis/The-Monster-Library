import React,{useState} from 'react'

import "./Register.css"
import axios from "axios"

const Register = () => {

    const [formInfo,setFormInfo] = useState({
        name:"",
        email:"",
        password:""
    })

    const {name,email,password} = formInfo

    const handleSubmit =(e)=>{
    e.preventDefault()
    axios.post("https://the-monster-library.herokuapp.com/register",formInfo)
    // axios.post("http://localhost:2000/register",formInfo)
    .then(response => {
      console.log(response)
    })
    .catch(error => {console.log(error)})
    // history.push("/fechedmons")
    }
    
  

    const handleName = (e) =>{
        setFormInfo({...formInfo,name: e.target.value});
    }
    const handleEmail = (e) =>{
        setFormInfo({...formInfo,email: e.target.value});
    }
    const handlePassword = (e) =>{
        setFormInfo({...formInfo,password: e.target.value});
    }

    return (
        <>
            <h1>Register Page!</h1>
            <form onSubmit={handleSubmit}>
                <input value={name} type="text" id="name" name="name" onChange={handleName}/>
                <input value={email} type="text" id="email" name="email" onChange={handleEmail}/>
                <input value={password} type="text" id="password" name="password" onChange={handlePassword}/>
                <button type="submit">Log In</button>
            </form>
        </>   
    )
}

export default Register;
