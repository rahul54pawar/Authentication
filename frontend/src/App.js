import React from "react"
import {useSelector} from "react-redux"
import "./App.css"
import Header from "./components/Header.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Welcome from "./components/Welcome.js";

import { Routes,Route } from 'react-router-dom'
const App = () =>{
  const isLoggedIn = useSelector(state=>state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <>
    <header>
    <Header />
    </header>
    <main>
      <Routes>
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/signup" element={ <Signup /> } />
        { isLoggedIn && <Route exact path="/user" element={ <Welcome /> } />}
      </Routes>
    </main>
    </>
  )
}

export default App;