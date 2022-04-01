import React, {useState, useEffect} from 'react'

function CreateBlock({messageBlock, algorithmData}) {

  const [message, setMessage] = useState([])

  const blockLength = algorithmData.block_length;
  const wordLength = algorithmData.word_length;
  const wordCount = (blockLength / wordLength)
  let messagearr = []

  for (let i = 1; i < wordCount+1; i++){
    const word = messageBlock.slice((i-1)*wordLength, i*wordLength)
    messagearr.push(word)
  }

  useEffect(() => {
    setMessage(messagearr)
  }, [messageBlock])

  return (
    <p> Completed Message Block: {message.map((word) =>  <p>{word}</p> )}</p>
    )
}
export default CreateBlock
/*

lowercase sigma 

x:        | 00000000000000000011111111111111 | (32 bits)
rotr(7):  | 11111110000000000000000001111111 |
rotr(18): | 00001111111111111100000000000000 | xor
shr(3) :  | 00000000000000000000011111111111 | xor

LocaSi(x) | 11110011111111111100011110000000 |
*/


