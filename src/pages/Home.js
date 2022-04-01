// The home page, here our user will start and see an input box and a selection of algorithms with some optional settings
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Asynch, { useAsynch } from 'react-select/async'
import InputForm from '../components/InputForm'
import HashVisualizer from '../components/HashVisaulizer'



function Home() {
  const [homeState, sethomeState] = useState(1)
  const [userInput, setUserInput] = useState()

  const handleHomeState = () => {
        sethomeState(homeState+1)
    }

  const handleUserInput = (newUserInput) => {
    setUserInput(newUserInput)
  }

  switch(homeState){
    case 1:
      return <InputForm handleHomeState={handleHomeState} handleUserInput={handleUserInput}/>
    case 2: 
      return <HashVisualizer userInput={userInput}/>
    default:
      return "neutral"
  }
}

export default Home
