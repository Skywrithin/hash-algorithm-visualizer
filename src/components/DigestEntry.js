import React from 'react'

function DigestEntry({digestProp, deleteHandler}) {

const plainInput = digestProp.message
const inputDigest = digestProp.digest
const algorithm = digestProp.algorithm.name

const handleClick = (e) => {
  deleteHandler(digestProp)
}

  return (
    <tr>
      <td>{plainInput}</td>
      <td>{algorithm}</td>
      <td>{inputDigest}</td>
      <td><button className='delete-button' onClick={handleClick}>Delete</button></td>
    </tr>
  )
}

export default DigestEntry