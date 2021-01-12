import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";


import MonsterPage from "./MonsterPage"

const Feched = (props) =>{
    
    // const url = "http://localhost:2000/monsters"
    const url = "https://the-monster-library.herokuapp.com/monsters"

    const [monster, setMonster] = useState([{}])

    const monsterId = useParams().monsterId

    const getMonster = async() =>{
    const response = await fetch(url)
    const monsters = await response.json();
    setMonster(monsters.filter(eachMonster => eachMonster._id === monsterId))}

    useEffect(()=>{
    getMonster()
    },[])



    return(
        <>
            <MonsterPage
                id = {monsterId}
                name={monster[0].name}
                origin={monster[0].origin}
                type={monster[0].type}
                content={monster[0].content}
                image={monster[0].imageLink}
                />
            <Link to="/fechedmons" className="new-monster">View Monsters</Link>
            <div className="create-button">
                <a href="/" className="create-button">
                +
                </a>
            </div>
       </> 
    )
}

export default Feched;