import React from "react";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom'
import "./card.scss";

function Card({ imageSource, title, categoria, tipo, redireccion }) {
  const history = useHistory()
  const handleClick = () => {
    if (tipo === 0){
      history.push(`/noticias/${categoria}`)
    }
    else if (tipo === 1){
      history.push(`/watch/cat-${categoria}`)
    }
    else if (tipo === 2){
      window.open(redireccion, "_blank")
    }
  }

  return (
    <div className="card text-center animate__animated animate__fadeInUp" onClick={handleClick}>
      <div className="overflow">
        <img src={imageSource} alt="" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  imageSource: PropTypes.string
};

export default Card;