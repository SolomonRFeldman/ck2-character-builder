import React, { useState, useEffect } from 'react'
import { Card, ButtonToolbar } from 'react-bootstrap'
import CharacterLoadSelect from './CharacterLoadSelect'
import CharacterLoadButton from './CharacterLoadButton'
import CharacterSaveButton from './CharacterSaveButton'

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
          <CharacterSaveButton 
            className='mr-2' 
            characters={characters} 
            setCharacters={setCharacters} 
            selectedChar={selectedChar} 
            character={character} 
          />
          <CharacterLoadButton className='mr-2' setCharacter={setCharacter} selectedChar={selectedChar} characters={characters} />
          <CharacterLoadSelect characters={characters} selectedChar={selectedChar} setSelectedChar={setSelectedChar} />
        </ButtonToolbar>
      </Card.Body>
    </Card>
  )
}