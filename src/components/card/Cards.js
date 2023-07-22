import React from "react";
import Card from "./Card";

import uniqid from 'uniqid'

const Cards = ({ categorias }) => {
  let cards = [];

  if (categorias){
    for (let i = 0;i < categorias.length; i++){
      cards.push({
        id: categorias[i].id,
        title: categorias[i].nombre,
        image: categorias[i].thumbnail,
        categoria: categorias[i].id,
        tipo: categorias[i].tipo,
        redireccion: categorias[i].redireccion,
      })
    }
  }
  return (
    <>
      <div className="container p-0 mb-sm-5 mb-2" key={uniqid()}>
        <div className="row" key={uniqid()}>
          {cards.map(({ title, image, id, categoria, tipo, redireccion }) => (
            <div className="col-sm-4 col-12 mt-4" key={uniqid()}>
              <Card imageSource={image} title={title} key={uniqid()} categoria={categoria} tipo={tipo} redireccion={redireccion}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cards;
