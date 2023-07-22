import React from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from 'react-router-dom'
import "./card.css";

function Card({ imageSource, title, idNoticia }) {
  const history = useHistory()
  const { id } = useParams()

  const handleClick = () => {
    history.push(`/noticias/${id}/nota/${idNoticia}`)
  }

  return (
    <div className="card animate__animated animate__fadeInUp" onClick={handleClick}>
      <div className="overflow">
        <img src={imageSource} alt="" className="card-img-top" />
      </div>
      <div className="card-body text-light">
      
        <p className="card-text text-light font-weight-bold" >
        {title ?? ""}
        </p>
        
        
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  imageSource: PropTypes.string
};

export default Card;
/*

<a
          href={url ? url : "#!"}
          target="_blank"
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
          
        </a>

*/