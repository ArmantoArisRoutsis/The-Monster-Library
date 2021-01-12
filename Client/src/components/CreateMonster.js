import React, { useState } from "react";
import axios from "axios"
import {useHistory} from "react-router-dom"

const SelectLevel = () => {
  const [monsterInfo, setMonsterInfo] = useState({
    name:"",
    origin:"",
    type:"",
    content:"",
    imageLink:""
  });


  const [imageValidationErros,setImageValidationErrors] = useState({});
  const [originValidationErros,setOriginValidationErrors] = useState({});
  const [nameValidationErros,setNameValidationErrors] = useState({});
  const [typeValidationErros,setTypeValidationErrors] = useState({});
  const [contentValidationErros,setContentValidationErrors] = useState({});


  const history = useHistory();

  const {name,origin,type,content,imageLink} = monsterInfo

  const handleName = (e) => {
    setMonsterInfo({...monsterInfo,name: e.target.value});
  };

  const handleOrigin = (e) =>{
    setMonsterInfo({...monsterInfo,origin: e.target.value})
  }
  const handleType = (e) =>{
    setMonsterInfo({...monsterInfo,type: e.target.value})
  }
  const handleContent = (e) =>{
    setMonsterInfo({...monsterInfo,content: e.target.value})
  }
  const handleLink = (e) =>{
    setMonsterInfo({...monsterInfo,imageLink: e.target.value})
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    const isValid = formValidation();
    console.log(monsterInfo)
    if(isValid){
      axios.post("https://the-monster-library.herokuapp.com/monsters",monsterInfo)
      // axios.post("http://localhost:2000/monsters",monsterInfo)
    .then(response => {
      console.log(response)
    })
    .catch(error => {console.log(error)})
    history.push("/fechedmons")
    }
    
  }

  const formValidation = () =>{
    const nameValidationErros = {};
    const originValidationErros = {};
    const typeValidationErros = {};
    const imageValidationErros = {};
    const contentValidationErros = {};

    let isValid = true;

    if(type===""){
      typeValidationErros.noneSelected = "You haven't selected a monster type yet!";
      isValid = false;
    }
    if(name===""){
      nameValidationErros.noneSelected = "Please type a Monster Name";
      isValid = false;
    }
    if(origin===""){
      originValidationErros.noneSelected = "Please enter the origin of the monster";
      isValid = false;
    }
    if(imageLink===""){
      imageValidationErros.noneSelected = "Please enter an image link";
      isValid = false;
    }
    if(content===""){
      contentValidationErros.noneSelected = "Please enter a description";
      isValid = false;
    }
    if(content.length>1000){
      contentValidationErros.noneSelected = "Your description must be within less or equal to 1000 Characters.";
      isValid = false;
    }

    setContentValidationErrors(contentValidationErros);
    setTypeValidationErrors(typeValidationErros);
    setNameValidationErrors(nameValidationErros);
    setOriginValidationErrors(originValidationErros);
    setImageValidationErrors(imageValidationErros);
    return isValid;
  }


  return (
    <>
    <div className="level-container">
    
    <h1 className="level-title">The Monster Library</h1>
      <h1 className="level-sub-title">Add a new monster to the library</h1>
      {Object.keys(nameValidationErros).map((key)=>{
          return <h5 className="error">{nameValidationErros[key]}</h5>
        })}

      <form onSubmit={handleSubmit} className="level-form">

        <input type="text" name="name" value={name} onChange={handleName} placeholder="Monster Name" className="name-input" autocomplete="off" />
        {Object.keys(originValidationErros).map((key)=>{
          return <h5 className="error">{originValidationErros[key]}</h5>
        })}

        <input type="text" name="name" value={origin} onChange={handleOrigin} placeholder="Origin" className="name-input" autocomplete="off" />
        {Object.keys(typeValidationErros).map((key)=>{
          return <h5 className="error">{typeValidationErros[key]}</h5>
        })}
        <select type="text" name="name" value={type} onChange={handleType} className="monster-input">
          <option value="" disabled selected>Monster Type</option>
          <option value="Flying Creature">Flying Creature</option>
          <option value="Land Creature">Land Creature</option>
          <option value="Human Hybrid">Human Hybrid</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Human&Animal Hybrid">Human&Animal Hybrid</option>
          <option value="Sea Creature">Sea Creature</option>
          <option value="Magical Creature">Magical Creature</option>
          <option value="Other">Other</option>
        </select>

        {Object.keys(contentValidationErros).map((key)=>{
          return <h5 className="error">{contentValidationErros[key]}</h5>
        })}
        <textarea rows="10" cols="50" value={content} onChange={handleContent} placeholder="Write a description about the monster" autocomplete="off"></textarea>
        <p className="char-check"><span style={content.length>1000?{color:"red", fontSize:"1.2rem"}:{}}>{content.length}</span>/1000</p>

        {Object.keys(imageValidationErros).map((key)=>{
          return <h5 className="error">{imageValidationErros[key]}</h5>
        })}
        <input type="text" name="imageLink" value={imageLink} onChange={handleLink} placeholder="Add an image link" className="image-input" autocomplete="off" />
        

        <button type="submit" className="level-btn" >Add Monster</button>
      </form>
    </div>
    </>
  );
};

export default SelectLevel;
