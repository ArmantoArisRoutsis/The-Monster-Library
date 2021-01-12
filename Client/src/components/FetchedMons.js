import React, {useState, useEffect} from "react";

import Card from "./Card"

import Aos from "aos"
import "aos/dist/aos.css"

const url = "https://the-monster-library.herokuapp.com/monsters"

// const url = "http://localhost:2000/monsters"


const FechedMons = () =>{
    const [monsters, setMonsters] = useState([])
    const [displayedMonsters, setDisplayedMonsters] = useState([])
    const categories = ["All",...new Set(monsters.map(monster=>monster.type))]

    const getMonsters = async() =>{
        const response = await fetch(url)
        const monsters = await response.json();
        setDisplayedMonsters(monsters)
        setMonsters(monsters)
    }

    useEffect(()=>{
    getMonsters()
    Aos.init({duration:2000})
    },[])

    // Filtering
    const filterByType =(categoty)=>{
        if(categoty==="All"){
            setDisplayedMonsters(monsters)
        }else{
            const newList  = monsters.filter(monster => monster.type === categoty)
            setDisplayedMonsters(newList)
        }
    }
    

    return(
        <>
        <div className="monster-container-card" >
            <h1 className="level-title">All the recorded monsters</h1>
        </div>
        <div className="category-container">
            <h2>Sort by category</h2>
            <div className="category-btns">
                {categories.map(category=>{return(
                    <button onClick={()=>filterByType(category)}>{category}</button>
                )})}
            </div>
        </div>
        <div className="gallery">
            {displayedMonsters.map((monster, index) => {
            return (
            <>  
                <Card
                id={monster._id}
                name={monster.name}
                image={monster.imageLink}
                />
            </>
            );
        })}
        </div>
        <div className="create-button">
            <a href="/" className="create-button">
              +
            </a>
        </div>
       </>
    )
}

export default FechedMons;