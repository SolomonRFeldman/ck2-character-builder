import React from 'react'
import { Form } from 'react-bootstrap'

export default function CharacterLoadSelect({characters, selectedChar, setSelectedChar}){
  const handleChange = event => setSelectedChar(event.target.value)
  return(
    <Form>
      <Form.Control aria-label='Character Load Select' onChange={handleChange} value={selectedChar} as="select">
        {characters.map(character => <option key={character.id} value={character.id}>{character.name} {character.dynasty}</option>)}
      </Form.Control>
    </Form>
  )
}