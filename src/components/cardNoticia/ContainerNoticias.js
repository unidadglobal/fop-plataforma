import React from "react";
import Card from "./Card";

import image1 from "../../assets/asociaciones.jpg";
import uniqid from 'uniqid'


const ContainerNoticias = ({ noticias }) => {
  let cards = [];

  if (noticias){
    for (let i = 0;i < noticias.length; i++){
      cards.push({
        id: noticias[i].id,
        title: noticias[i].titulo,
        image: noticias[i].imagen,
      })
    }
  }

  return (
    <div className="container mb-4" key={uniqid()} style={{
      minHeight: "80vh"
   }}>
      <div className="row" key={uniqid()}>
        {cards.map(({ title, image, id}) => (
          <div className="col-md-4 mt-4" key={uniqid()}>
            <Card imageSource={image} title={title} idNoticia={id} key={uniqid()}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContainerNoticias;
