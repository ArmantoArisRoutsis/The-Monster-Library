import React, {useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios"

const Feched = (props) =>{

    const history = useHistory();
    
    // const url = "http://localhost:2000/monsters"
    const url = "https://the-monster-library.herokuapp.com/monsters"

    const [monster, setMonster] = useState([{}])
    const [monsterInfo,setMonsterInfo] = useState({})

    const monsterId = useParams().monsterId

    const getMonster = async() =>{
    const response = await fetch(url)
    const monsters = await response.json();
    setMonster(monsters.filter(eachMonster => eachMonster._id === monsterId))
    setMonsterInfo(monsters.filter(eachMonster => eachMonster._id === monsterId)[0])
    
}

    useEffect(()=>{
    getMonster()
    },[])


    const handleName = (e) => {
    setMonsterInfo({...monsterInfo,name: e.target.value})
    };
    const handleContent = (e) => {
    setMonsterInfo({...monsterInfo,content: e.target.value})
    };
    const handleImage = (e) => {
    setMonsterInfo({...monsterInfo,imageLink: e.target.value})
    };
    const handleOrigin = (e) => {
    setMonsterInfo({...monsterInfo,origin: e.target.value})
    };
    const handleType = (e) => {
    setMonsterInfo({...monsterInfo,type: e.target.value})
    };

    const handleSubmit = (e) =>{
    e.preventDefault()
    // axios.put("http://localhost:2000/updatemonster",monsterInfo
    axios.put("https://the-monster-library.herokuapp.com/updatemonster",monsterInfo
    ,{
    headers: {},data: {source: monster}})
    history.push("/feched/"+monsterInfo._id)
  }


    return(
    <>
    {console.log(monsterInfo)}
    <div onSubmit={handleSubmit} className="level-container">
        <form className="level-form">
            <h1 className="level-sub-title">Edit</h1>
            <input value={monsterInfo.name} name="name" onChange={handleName} className="name-input"/>
            <input value={monsterInfo.origin} name="name" onChange={handleOrigin} className="name-input"/>
            <img src={monsterInfo.imageLink} className="image-preview" />
            <input value={monsterInfo.imageLink} name="name" onChange={handleImage} className="name-input"/>
            <select type="text" name="name" value={monsterInfo.type} onChange={handleType} className="monster-input">
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
            <textarea rows="10" cols="50" value={monsterInfo.content} onChange={handleContent} style={{fontFamily:"sans-serif"}}></textarea>
            <button type="submit" className="level-btn" >Save Changes</button>
            <Link to={"/feched/"+monsterId} style={{ textDecoration: 'none' }}><button className="level-btn" >Go back</button></Link>
        </form>
    </div>

       </> 
    )
}

export default Feched;