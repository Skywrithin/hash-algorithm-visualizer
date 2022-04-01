import React from 'react'
import { useEffect, useState } from 'react';

import CreateBlock from './CreateBlock';
import CreateInitalHash from './CreateInitalHash';
import CreateMessage from './CreateMessage';
import CreatePadding from './CreatePadding';
import CreateRoundConstants from './CreateRoundConstants';
import CreateMessageSchedule from './CreateMessageSchedule';
import FinalHash from './FinalHash'

function HashVisualizer({ userInput }) { //Should bring in selected algorithm, input and
//State Variables
  const [algorithmData, setAlgorithmData] = useState({})  //-Data about the selected algorithm
  const [messageBlock, setMessageBlock] = useState([])    //-Plain string of 1s and 0s of our message, not format or rows/word
  const [allConstants, setAllConstants] = useState([])    //-All constants of the selected algorithm
//View Controll for User
  const [step, setStep] = useState(1)
    const [first, setfirst] = useState(false)
    const [second, setsecond] = useState(false)
    const [third, setthird] = useState(false)
    const [fourth, setfourth] = useState(false)
    const [fifth, setfifth] = useState(false)
    const [sixth, setsixth] = useState(false)
//Timers for our controllers
  setTimeout(()=>setfirst(true), 6000)
  setTimeout(()=>setsecond(true), 8500)
  setTimeout(()=>setthird(true), 9500)
  setTimeout(()=>setfourth(true), 10500)
  setTimeout(()=>setfifth(true), 11100)
  setTimeout(()=>setsixth(true), 13400)
console.log(userInput)
//Matricies//----------------------->

  //Rounds Constants Matrix of an array and its object  //FOR LATER: RENDER DYNAMIC COMPONENTS FROM OBJECT AND ITERATOR

const [roundConstantArray, setRoundConstantArray] = useState([])// array of our round constants, 
const [roundConstantsMatrix, setRoundConstantsMatrix] = useState({})// object with key/value pairs created from the array

const [messageScheduleArray, setMessageScheduleArray] = useState([])
const [messageScheduleMatrix, setMessageScheduleMatrix] = useState({})

const [initialHashArray, setinitialHashArray] = useState([])
const [initialHashMatrix, setInitialHashMatrix] = useState({})

//END MATRICIES INITIALIZERS//---------------------->

//Round Constant Data
  useEffect(() => {
    setRoundConstantArray(allConstants.slice(8, 72).map((object)=> (object.binary_value)))
  }, [allConstants])

  useEffect(() => {
    setRoundConstantsMatrix(Object.assign({}, roundConstantArray))
  }, [roundConstantArray])

//Initial Message-Schedule Data
  useEffect(() => {
    let messagearr = []
    const wordCount = (algorithmData.block_length / algorithmData.word_length)
    for (let i = 1; i < wordCount+1; i++){
      const word = messageBlock.slice((i-1)*algorithmData.word_length, i*algorithmData.word_length)
      messagearr.push(word)
    };setMessageScheduleArray(messagearr)
  }, [messageBlock]);

  useEffect(() => {
    setMessageScheduleMatrix(Object.assign({}, messageScheduleArray))
  }, [messageScheduleArray])


//Initial Hash
  useEffect(() => {
    setinitialHashArray(allConstants.slice(0,8).map((object)=> (object.binary_value)))
  }, [allConstants])


//Input Converters
function convertToBytes(string) {
  return string.split('').map(function (char) {
    return char.charCodeAt(0);
  }).join(' ');
}
function convertToBinary(string) {
  return string.split('').map(function (char) {
    return char.charCodeAt(0).toString(2);
  }).join('');
}

//Variables of the message/block
  const input = userInput.input
  const inputByes = convertToBytes(input)
  const binaryInput = convertToBinary(input)

  const message_length = convertToBinary(input).length
  const block_size = algorithmData.block_length
  const padding_size = block_size - message_length

  const metadata = convertToBinary(message_length.toString())
  const white_space = padding_size - (metadata.length + 1)

  // initialize/create variables iside of these objects
  const inputProps = {
    input: input,
    inputByes: inputByes,
    binaryInput: binaryInput,
    message_length: message_length
  }

  const paddingProps = {
    white_space: white_space,
    metadata: metadata,
    padding_size: padding_size,
    messageBlock: messageBlock
  }

//Get data about the selected algorithm
  useEffect(() => {
    fetch(`http://localhost:9292/algorithms/${userInput.algorithm}`)
    .then(r=> r.json())
    .then((data)=>(setAlgorithmData(data)))
  }, [userInput.algorithm])

  useEffect(() => {
    fetch(`http://localhost:9292/constants/${algorithmData.id}`)
    .then(r=> r.json())
    .then((data)=>(setAllConstants(data)))
  }, [algorithmData.id])

//Create the padding dervied from all the above
  useEffect(() => {
    setTimeout(() => {
      const padding = new Array(white_space).fill(0) //Create a new array of zeros with space for metadata, and the sperator bit.
      Array.from(metadata).forEach(bit => padding.push(bit)) //Convert metadata to elements of an array and push them to the end of the padding
      padding.unshift(1) //Create the seperator bit for padding
      padding.join('') //We need to convert our array to a string, therefore we join
      setMessageBlock([binaryInput, padding.join('')].join('')) //Join our sections of the message block and set them to state
    }, 6000);
  }, [white_space])




  switch(step){
    case 1:
      return (
      <>
      <CreateMessage inputProps={inputProps}/>
      {first &&<CreatePadding paddingProps={paddingProps}/>}
      {second && <CreateBlock messageBlock={messageBlock} algorithmData={algorithmData}/>}
      {third && <CreateInitalHash initialHashArray={initialHashArray}/>}
      {fourth && <CreateRoundConstants roundConstantArray={roundConstantArray}/>}
      {fifth && <CreateMessageSchedule messageScheduleArray={messageScheduleArray} messageScheduleMatrix={messageScheduleMatrix}/>}
      {sixth && <CreateMessageSchedule messageScheduleArray={roundConstantArray} messageScheduleMatrix={messageScheduleMatrix}/>}
      {sixth && <FinalHash initialHashArray={initialHashArray} />}
      </>
      )
    case 2:
      return (<><div>ERROR</div></>)
    default:
      return "ERROR"
  }
}

export default HashVisualizer