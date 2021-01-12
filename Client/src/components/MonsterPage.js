import React from "react";
import "./MonsterPage.css";
import axios from "axios"
import {useHistory, Link} from "react-router-dom"

const MonsterPage = (props) => {
const history = useHistory();

  const handleDelete = () =>{
    // axios.delete("http://localhost:2000/deletemonster",
    axios.delete("https://the-monster-library.herokuapp.com/deletemonster",
    {
    headers: {},data: {source: props}})
    history.push("/fechedmons")
  }

  return (
    <>  
        {console.log(props)}
        <div key={props.key} className="monster-page">
        <article className="book-page">
            <h2 className="page-name">{props.name}</h2>
            <div className="page__stats">
                <p>Origin: {props.origin}</p>
                <p>Type: {props.type}</p>
                <div className="user-option-btns">
                  <Link to={"/edit/"+props.id}><button>EDIT</button></Link>
                  <button onClick={handleDelete}>DELETE</button>
                </div>
                
            </div>
            <div className="page-monster-image" style={{backgroundImage: "linear-gradient(to right, rgb(20, 20, 20, 0), rgba(71, 71, 71,0)),url("+props.image+")"}}>
            </div>
            <div className="monster-description">
                <h2>Description: </h2>
                <p>{props.content}</p>
            </div>
            
        </article>
        </div>
    </>
  );
};

export default MonsterPage;