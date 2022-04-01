import React, { useState, useEffect} from 'react'

function CreateMessageSchedule({ messageScheduleArray, messageScheduleMatrix }) {

const [Schedule, setSchedule] = useState(messageScheduleArray)

useEffect(() => {
    setSchedule([...Schedule, ])
}, [])

console.log(Schedule[0], 2) //binary
console.log(parseInt(Schedule[0], 2))
console.log(parseInt(Schedule[0], 2) >>> 1)
console.log(parseInt(Schedule[0], 2) >>> 1)



  return (
      <>
      <p>MESSAGE SCHEDULE</p>
    <div>{Schedule.map((word) =>  <p>{word}</p> )}</div>
      </>
  )
}

export default CreateMessageSchedule