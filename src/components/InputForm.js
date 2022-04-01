import React, { useState, useEffect } from 'react'
import Select from 'react-select'

function InputForm({ handleHomeState, handleUserInput}) {
  //Form State
  const initialFormState = { algorithm: "", input: "" }
  const [formState, setFormState] = useState(initialFormState)

  // 1.Create State for Options on Our dropdown form  2.make the request  3.store the names in state and 
  const [algoNames, setAlgoNames] = useState([]) //algoNames is an array of names of algorithms in our database
  useEffect(() => {
    fetch("http://localhost:9292/algorithms/names")
    .then(resp => resp.json())
    .then(algorithmNamesArray => setAlgoNames(algorithmNamesArray))
  }, [])
  const algoOptions = algoNames.map(nameObj => ({value: `${nameObj.name}`, label: `${nameObj.name}`}))

  const PostMessageInstance = (formState) => {
    fetch(`http://localhost:9292/messages`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: formState.input,
        digest: "test",
        algorithm: formState.algorithm
      }),
    })
  };

  const Dropdown = () => (
    <Select options={algoOptions} name="algorithm" onChange={handleChange} value={formState.algorithm}/>
  )

  //Handlers for our form and dropdown menu
  const handleSubmit = (e) => {
    e.preventDefault()
    PostMessageInstance(formState)
    handleUserInput(formState)
    handleHomeState()
    setFormState(initialFormState)
  }

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormState(formState => ({...formState, [name]: value}))
  }

  const handleChange = (event) => {
    const { value } = event;
    setFormState(formState => ({...formState, "algorithm": value})) //autofixed ["algorithm"] to current
  }

  return (
  <form className="input-form" onSubmit={handleSubmit} >
    <h3>Hash Something</h3>
    <Dropdown />
    {formState.algorithm}
    <input
      type="text"
      id="input"
      name="input"
      onChange={handleInput}
      value={formState.input}
    />
    <button type ="submit">Begin Hashing</button>
  </form>
  )
}
export default InputForm