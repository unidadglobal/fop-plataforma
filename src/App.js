import React, { useState } from 'react'

import * as firebase from '../src/firebase'
import { Container } from 'react-bootstrap'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Sidebar from './components/sidebar/Sidebar'
import NoticiasScreen from './screens/noticiasScreen/NoticiasScreen'
import VerNoticiaScreen from './screens/verNoticiaScreen/VerNoticiaScreen'
import SearchScreen from './screens/searchScreen/SearchScreen'

import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

import './_app.scss'
import WatchScreen from './screens/watchScreen/WatchScreen'


const Layout = ({ children }) => {
   const [sidebar, toggleSidebar] = useState(false)
   const handleToggleSidebar = () => toggleSidebar(value => !value)

   return (
      <>
         <Header handleToggleSidebar={handleToggleSidebar} />
         <div className='app__container'>
            <Sidebar
               sidebar={sidebar}
               handleToggleSidebar={handleToggleSidebar}
            />
            <Container fluid className='app__main '>
               {children}
            </Container>
         </div>
         <Footer/>
      </>
   )
}

const App = () => {
   return (
      <Switch>
         <Route path='/' exact>
            <Layout>
               <WatchScreen />
            </Layout>
         </Route>

         <Route path='/watch/:id'>
            <Layout>
               <WatchScreen />
            </Layout>
         </Route>

         <Route path='/noticias/:id/nota/:idnota'>
            <Layout>
               <VerNoticiaScreen />
            </Layout>
         </Route>

         <Route path='/noticias/:id'>
            <Layout>
               <NoticiasScreen />
            </Layout>
         </Route>

         <Route path='/buscar/'>
            <Layout>
               <SearchScreen />
            </Layout>
         </Route>

         <Route>
            <Redirect to='/' />
         </Route>
      </Switch>
   )
}

export default App
