import React, { useEffect } from 'react'
import './_sidebar.scss'
import { useHistory } from 'react-router-dom'

import {
   MdHome,
} from 'react-icons/md'

import {
   AiFillInstagram
} from 'react-icons/ai'

import { FaFacebook, FaInfoCircle, FaTwitter } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { getWebInfo } from '../../redux/actions/webinfo.action'


const Sidebar = ({ sidebar, handleToggleSidebar }) => {
   const history = useHistory()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getWebInfo())
   }, [dispatch])

   const { webinfo } = useSelector(
      state => state.webinfo
   )
   
   return (
      <nav
         className={sidebar ? 'sidebar open' : 'sidebar'}
         onClick={() => handleToggleSidebar(false)}>
         <li onClick={() => {
            history.push(`/`)
         }}>
            <MdHome size={23} />
            <span>Inicio</span>
         </li>
         
         <li onClick={()=> 
            { 
               if (webinfo && webinfo.instagram){
                  window.open(webinfo.instagram, "_blank")
               }
            }
         }>
            <AiFillInstagram size={25}/>
            <span>Instagram</span>
         </li>

         <li onClick={()=> 
            { 
               if (webinfo && webinfo.facebook){
                  window.open(webinfo.facebook, "_blank")
               }
            }
         }>
            <FaFacebook size={23} />
            <span>Facebook</span>
         </li>
         <li onClick={()=> 
            { 
               if (webinfo && webinfo.twitter){
                  window.open(webinfo.twitter, "_blank")
               }
            }
         }>
            <FaTwitter size={23} />
            <span>Twitter</span>
         </li>
         <li>
            <FaInfoCircle size={23} />
            <span>Nosotros</span>
         </li>
      </nav>
   )
}

export default Sidebar
