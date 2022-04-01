import React,{ useState } from 'react'

function CreateMessage({inputProps}){
  const [first, setfirst] = useState(false)
  const [second, setsecond] = useState(false)
  const [third, setthird] = useState(false)

  setTimeout(()=>setfirst(true), 1000)
  setTimeout(()=>setsecond(true), 2000)
  setTimeout(()=>setthird(true), 3000)

return (
    <div>
        <p>Message Formation</p>
        {first && <p>Raw input:  {inputProps.input}</p>}
        {second && <p>Bytes:  {inputProps.inputByes}</p>}
        {third &&<p>Binary: {inputProps.binaryInput } ({inputProps.message_length}-bits)</p>}

    </div>
  )
}
export default CreateMessage