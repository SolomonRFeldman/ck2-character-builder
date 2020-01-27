import React, { useState, useEffect } from 'react'
import { Card, ButtonToolbar, Button } from 'react-bootstrap'
import CharacterLoadSelect from './CharacterLoadSelect'
import CharacterLoadButton from './CharacterLoadButton'
import CharacterSaveButton from './CharacterSaveButton'
import Character from '../../models/Character'

export default function CharacterPersistanceCard({character, setCharacter}) {
  const [characters, setCharacters] = useState([])
  const [selectedChar, setSelectedChar] = useState()

  useEffect(() => { fetch('/characters').then(resp => resp.json()).then(json => {
    setCharacters(json)
    if(json[0]) { setSelectedChar(json[0].id) }
  }) }, [])

  return(
    <Card>
      <Card.Body>
        <ButtonToolbar>
          <Button aria-label='Character New Button' onClick={() => setCharacter(new Character)}>New</Button>
          <CharacterSaveButton 
            className='mr-2' 
            character={character}
            setCharacter={setCharacter}
            characters={characters}
            setCharacters={setCharacters} 
            setSelectedChar={setSelectedChar} 
          />
          <CharacterLoadButton className='mr-2' setCharacter={setCharacter} selectedChar={selectedChar} characters={characters} />
          <CharacterLoadSelect characters={characters} selectedChar={selectedChar} setSelectedChar={setSelectedChar} />
        </ButtonToolbar>
      </Card.Body>
    </Card>
  )
}