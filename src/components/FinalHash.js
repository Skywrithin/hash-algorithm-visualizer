import React, { useState, useEffect } from 'react'

function CreateInitalHash({initialHashArray}) {

  return (
    <div> FINAL HASH: {initialHashArray.map((word)=> (<p>{word}</p>))}</div>
  )
}

export default CreateInitalHash