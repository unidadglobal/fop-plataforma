import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './verNoticiaScreen.scss'

import { getNotaById } from '../../redux/actions/noticias.action'
import { Container, Carousel } from 'react-bootstrap'

const VerNoticiaScreen = () => {
   const { idnota } = useParams()
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getNotaById(idnota))
   }, [dispatch])

   const { nota, loading: notaLoading } = useSelector(
      state => state.noticias
   )


   return (
      <>
         {
            notaLoading ?
               <Container style={{
                     minHeight: "80vh"
                  }} className="h-100 d-flex align-items-center justify-content-center">
                  <div className='spinner-border text-danger d-block mx-auto'></div>
               </Container>
               :
               nota ?
                  <Container className="bg-light w-100 mb-5 p-3 pb-5" style={{ minHeight: "80vh" }}>
                     <h1 className='nota-title text-dark'>{nota.titulo ?? ""}</h1>
                     <h5 className='nota-subtitle text-dark'>{nota.subtitulo ?? ""}</h5>
                     <h6 className='text-secondary mb-3'>{nota.fechatext ?? ""}</h6>

                     {
                        nota.imagenes ?
                           <Carousel className="bg-dark mb-4">
                              {nota.imagenes.map((image) => (
                                 <Carousel.Item interval={10000}>
                                 <img
                                    className="d-block img-nota"
                                    src={image}
                                    alt="imagen"
                                 />
                                 </Carousel.Item>
                              ))}
                           </Carousel>
                        : <></>
                  }
                     <p className="text-dark content-nota">
                        {nota.contenido ?? ""}
                     </p>
                  </Container>
                  : <></>
         }

      </>
   )


}

export default VerNoticiaScreen

