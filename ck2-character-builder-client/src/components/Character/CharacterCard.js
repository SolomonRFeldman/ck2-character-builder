import React, { useState } from 'react'
import './CharacterCard.css'
import CardGroup from 'react-bootstrap/CardGroup'
import AttributeCard from '../Attribute/AttributeCard'
import CharacterDetailsCard from './CharacterDetailsCard'
import Character from '../../models/Character'

export default function CharacterCard(props) {
  const [character, setCharacter] = useState({...new Character(props.character)})

  return(
    <CardGroup className='mx-auto my-4 character-card'>
      <CharacterDetailsCard character={character} setCharacter={setCharacter} />
      <AttributeCard character={character} setCharacter={setCharacter} />
    </CardGroup>
  )
}

CharacterCard.defaultProps = {character: {}}