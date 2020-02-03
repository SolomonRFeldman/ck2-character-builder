import React from 'react'
import './LoadCharacterSelect.css'
import { Form } from 'react-bootstrap'

export default function LoadCharacterSelect({characters, selectedChar, setSelectedChar, serverError}){
  const handleChange = event => setSelectedChar(event.target.value)
  return(
    <Form className='load-character-select'>
      <Form.Control 
        aria-label='Load Character Select' 
        onChange={handleChange} 
        value={selectedChar} 
        as="select" 
        isInvalid={serverError}
      >
        {characters.map(character => <option key={character.id} value={character.id}>{character.name} {character.dynasty}</option>)}
      </Form.Control>
      <Form.Control.Feedback aria-label='Save Error' type="invalid">{serverError}</Form.Control.Feedback>
    </Form>
  )
}