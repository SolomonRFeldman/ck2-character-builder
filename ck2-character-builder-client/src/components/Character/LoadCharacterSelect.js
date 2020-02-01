import React from 'react'
import { Form } from 'react-bootstrap'

export default function LoadCharacterSelect({characters, selectedChar, setSelectedChar}){
  const handleChange = event => setSelectedChar(event.target.value)
  return(
    <Form style={{maxWidth: 'calc(100% - 70px)'}}>
      <Form.Control aria-label='Load Character Select' onChange={handleChange} value={selectedChar} as="select">
        {characters.map(character => <option key={character.id} value={character.id}>{character.name} {character.dynasty}</option>)}
      </Form.Control>
    </Form>
  )
}