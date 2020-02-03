import React, { useState, useEffect } from 'react'
import { Card, ButtonToolbar, Button, Row, Col } from 'react-bootstrap'
import LoadCharacterSelect from './LoadCharacterSelect'
import LoadCharacterButton from './LoadCharacterButton'
import SaveCharacterButton from './SaveCharacterButton'
import Character from '../../models/Character'
import { jsonFetch } from '../../fetch'

export default function CharacterPersistanceCard({character, setCharacter}) {
  const [characters, setCharacters] = useState([])
  const [selectedChar, setSelectedChar] = useState()
  const [serverError, setServerError] = useState()

  useEffect(() => { jsonFetch('/characters').then(json => {
    setCharacters(json)
    if(json[0]) { setSelectedChar(json[0].id) }
  }) }, [])

  return(
    <Card>
      <Card.Body>
        <ButtonToolbar aria-label='Character Persistance Card'>
          <Col>
            <Row className='mb-2'>
              <Button aria-label='New Character Button' onClick={() => setCharacter(new Character())}>New</Button>
              <SaveCharacterButton
                className='ml-2' 
                character={character}
                setCharacter={setCharacter}
                characters={characters}
                setCharacters={setCharacters} 
                setSelectedChar={setSelectedChar} 
                setServerError={setServerError}
              />
            </Row>

            <Row>
              <LoadCharacterButton className='mr-2' setCharacter={setCharacter} selectedChar={selectedChar} characters={characters} />
              <LoadCharacterSelect 
                characters={characters} 
                selectedChar={selectedChar} 
                setSelectedChar={setSelectedChar} 
                serverError={serverError}
              />
            </Row>
          </Col>
        </ButtonToolbar>
      </Card.Body>
    </Card>
  )
}