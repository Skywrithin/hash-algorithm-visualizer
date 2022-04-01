// The history page will have a history the users inputs with their algo and 
//the output

import React, { useState, useEffect } from 'react'
import DigestEntry from '../components/DigestEntry'

function History() {

  const [messageObjects, setMessageObjects] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/messages")
    .then(resp => resp.json())
    .then(respOFmessageObjects => setMessageObjects(respOFmessageObjects))
  }, []);console.log(messageObjects)

  const deleteById = (id) => {
    fetch(`http://localhost:9292/messages/${id}`, {
      method: 'DELETE'
    })
  }

const deleteHandler = (digestProp) => {
  let newArray = messageObjects.filter(entry => entry !== digestProp)
  setMessageObjects(newArray)
  deleteById(digestProp.id)

  // deleteById()
}


// const handleClick = (e) => {
//   console.log(e.target)
//   console.log(digestProp)
//   console.log(e.target)
// }

  const messages = messageObjects.map((entry) => (<DigestEntry key={entry.id} digestProp={entry} deleteHandler={deleteHandler}/>))

  return (
    <>
    <table> 
      <thead>
        <tr>
        <th>Input</th>
        <th>Algorithm</th>
        <th>Digest</th>
        </tr>
      </thead>
      <tbody>
    {messages}
      </tbody>
    </table>

    </>
  )
}

export default History