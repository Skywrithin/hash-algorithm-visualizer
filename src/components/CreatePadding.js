import React, {useState} from 'react'

function CreatePadding({paddingProps}) {
  const [first, setfirst] = useState(false)
  const [second, setsecond] = useState(false)
  const [third, setthird] = useState(false)
  const [fourth, setfourth] = useState(false)

  setTimeout(()=>setfirst(true), 500)
  setTimeout(()=>setsecond(true), 1000)
  setTimeout(()=>setthird(true), 1500)
  setTimeout(()=>setfourth(true), 2000)

  return (
    <>
      <p>Padding:  ({paddingProps.padding_size} Bits)</p>
      <p>{first && <>1 (seperator)</>} {second && <> {Array(paddingProps.white_space).fill(0)} (white space)</>} {third && <>{paddingProps.metadata} (metadata)</>}</p>
      <>{fourth && <>Completed Message: (512 bits) {paddingProps.messageBlock}</>}</>
    </>
  )
}

export default CreatePadding