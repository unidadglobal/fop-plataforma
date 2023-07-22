import React from 'react'
import { Carousel } from 'react-bootstrap';
import './bannersPublicidad.scss'
function BannersPublicidad({ banners }) {
    return (
        <Carousel style={{ marginBottom: "1rem", marginTop: "1.5rem" }} controls={false}
            indicators={false}>
            {banners.map((banner) => (
                <Carousel.Item interval={4000} key={banner.id}>
                    <img
                        className="d-block banner-publicitario"
                        src={banner.imagen}
                        alt="Publicidad"
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default BannersPublicidad
