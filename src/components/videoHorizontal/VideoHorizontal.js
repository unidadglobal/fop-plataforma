import React, { useEffect, useState } from 'react'
import './_videoHorizontal.scss'

import { AiFillEye } from 'react-icons/ai'
import moment from 'moment'
import numeral from 'numeral'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const VideoHorizontal = ({ video }) => {
   const {
      id,
      nombre, 
      thumbnail,
      duration,
      vistas,
      tipo
   } = video

   const history = useHistory()
   const handleClick = () => {
      // TODO handle channel click
      history.push(`/watch/${id}`)
   }
   return (
      <Row
         className='py-2 m-1 videoHorizontal align-align-items-center'
         onClick={handleClick}>
         {/* //TODO refractor grid */}
         <Col xs={6} md={6} className='videoHorizontal__left'>
            <LazyLoadImage
               src={thumbnail ? thumbnail : "/logoBN.jpg"}
               effect='blur'
               className='videoHorizontal__thumbnail'
               wrapperClassName='videoHorizontal__thumbnail-wrapper'
               style={{maxHeight: "100px"}}
            />{
               tipo === "video" && duration ?
               <span className='videoHorizontal__duration videoHorizontal__video'>{duration}</span> :
               tipo === "canal" ?
               <span className='videoHorizontal__duration videoHorizontal__live'>VIVO</span> : <span></span>
            }
            
         </Col>
         <Col xs={6} md={6} className='p-0 pt-3 videoHorizontal__right'>
            <p className='mb-1 videoHorizontal__title'>{nombre}</p>
            <div className='videoHorizontal__details'>
               <AiFillEye /> {numeral(vistas ? vistas : 0).format('0.a')} {duration ? "Vistas" : "Viendo"} 
            </div>

            <div className='my-1 videoHorizontal__channel d-flex align-items-center'>
               <p className='mb-0'>FOP TV</p>
            </div>
         </Col>
      </Row>
   )
}

export default VideoHorizontal
