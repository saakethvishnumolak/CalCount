import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'
//import notFound from './components/notFound'
import Track from './components/Track'
import Private from './components/Private'
import Diet from './components/Diet'

import { userAuth } from './contexts/userAuth';

function App() {


    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("calcount-user")));

  return (
    <>

      <userAuth.Provider value={{loggedUser, setLoggedUser}}>

          <BrowserRouter>

              <Routes>

                  <Route path='/' element={<Login/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/register' element={<Register/>}/>
                  <Route path='/track' element={<Private Component={Track}/>}/>
                  <Route path='/diet' element={<Private Component={Diet}/>}/>
                  <Route path='*' element={<notFound/>}/>
                  
              </Routes>

          </BrowserRouter>

      </userAuth.Provider>
    </>
  )
}

export default App
