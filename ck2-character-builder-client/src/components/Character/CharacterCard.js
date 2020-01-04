import React, { useState } from 'react'
import CardGroup from 'react-bootstrap/CardGroup'
import AttributeCard from '../Attribute/AttributeCard'
import CharacterDetailsCard from './CharacterDetailsCard'

export default function CharacterCard(props) {
  const [character, setCharacter] = useState({})

  return(
    <CardGroup className='mx-auto' style={{maxWidth: '800px'}}>
      <CharacterDetailsCard character={character} setCharacter={setCharacter} />
      <AttributeCard />
    </CardGroup>
  )
}