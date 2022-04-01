import React, { useState, useEffect } from 'react'

function CreateInitalHash({initialHashArray}) {

  return (
    <div>INITAL HASH: {initialHashArray.map((word)=> (<p>{word}</p>))}</div>
  )
}

export default CreateInitalHash