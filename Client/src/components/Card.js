import React from "react";

import {Link} from "react-router-dom"
import "./Card.css";

const Card = (props) => {

  return (
    <>
    <Link to={"/feched/"+props.id}>
      <a name={props.name} >
        <div className="stats-container" style={{backgroundImage: "linear-gradient(to top, rgb(24, 12, 78, 2), rgba(71, 71, 71,0)),url("+props.image+")"}}>
            <h1 className="monster-name">{props.name}</h1>
        </div>
      </a>
     </Link>
     
    </>
  );
};

export default Card;