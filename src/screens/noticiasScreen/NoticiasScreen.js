import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './noticiasScreen.scss'
import { useHistory } from 'react-router-dom'
import ContainerNoticias from '../../components/cardNoticia/ContainerNoticias'
import { getNoticiasByCategory } from '../../redux/actions/noticias.action'
import { Container } from 'react-bootstrap'

const NoticiasScreen = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const history = useHistory()
   useEffect(() => {
      dispatch(getNoticiasByCategory(id))
   }, [dispatch])

   const { noticias, loading: noticiasLoading } = useSelector(
      state => state.noticias
   )

   return (
      <>
         {

            noticiasLoading ?
               <Container className="h-100 d-flex align-items-center justify-content-center"
                  style={{
                     minHeight: "80vh"
                  }}
               >
                  <div className='spinner-border text-danger d-block mx-auto'></div>
               </Container>
               :
               !noticias && !noticiasLoading ?
                  <div className='login' style={{
                     minHeight: "80vh"
                  }}>
                     <div className='login__container'>
                        <h4 className="mb-5">No se encontaron Noticias</h4>
                        <button onClick={() => history.push('/')}>VOLVER AL INICIO</button>
                     </div>
                  </div>
                  :
                  noticias ?
                     <ContainerNoticias noticias={noticias}/>
                     : <></>
         }
      </>
   )


}

export default NoticiasScreen

