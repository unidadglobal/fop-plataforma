import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './searchScreen.scss'
import { Container, Col } from 'react-bootstrap'
import SkeletonVideo from '../../components/skeletons/SkeletonVideo'
import uniqid from 'uniqid'
import Video from '../../components/video/Video'

const SearchScreen = () => {
   const history = useHistory();
   const { resultados, loading: searching } = useSelector(
      state => state.search
   )

   return (
      <Container style={{
         minHeight: "80vh"}}>
         <div
            className='row'>
            {!searching
               ? resultados.map(video => (
                  <Col lg={3} md={4} key={uniqid()}>
                     <Video video={video} key={video.id} />
                  </Col>
               ))
               : searching ? [...Array(20)].map((e, i) => (
                  <Col lg={3} md={4} key={uniqid()}>
                     <SkeletonVideo />
                  </Col>
               )) : !resultados && !searching ? 
                  <div className='login'>
                     <div className='login__container'>
                        <h4 className="mb-5">No se encontaron resultados</h4>
                        <button onClick={() => history.push('/')}>VOLVER AL INICIO</button>
                     </div>
                  </div>
                  : <></>
               
               }
         </div>

      </Container>
   )


}

export default SearchScreen