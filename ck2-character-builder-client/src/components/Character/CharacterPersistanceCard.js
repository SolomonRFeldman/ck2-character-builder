import React, { useState, useEffect } from 'react'
import { Card, ButtonToolbar, Button, Row, Col } from 'react-bootstrap'
import LoadCharacterSelect from './LoadCharacterSelect'
import LoadCharacterButton from './LoadCharacterButton'
import SaveCharacterButton from './SaveCharacterButton'
import Character from '../../models/Character'
import { fetchUntilSuccess } from '../../fetch'

export default function CharacterPersistanceCard({character, setCharacter}) {
  const [characters, setCharacters] = useState([])
  const [selectedChar, setSelectedChar] = useState()

  useEffect(() => { fetchUntilSuccess('/characters').then(resp => resp.json()).then(json => {
    setCharacters(json)
    if(json[0]) { setSelectedChar(json[0].id) }
  }) }, [])

  return(
    <Card>
      <Card.Body>
        <ButtonToolbar>
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
              />
            </Row>

            <Row>
              <LoadCharacterButton className='mr-2' setCharacter={setCharacter} selectedChar={selectedChar} characters={characters} />
              <LoadCharacterSelect characters={characters} selectedChar={selectedChar} setSelectedChar={setSelectedChar} />
            </Row>
          </Col>
        </ButtonToolbar>
      </Card.Body>
    </Card>
  )
}