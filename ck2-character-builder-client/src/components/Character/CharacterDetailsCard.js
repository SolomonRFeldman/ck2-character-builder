import React from 'react'
import Card from "react-bootstrap/Card";
import CharacterIdentityCard from './CharacterIdentityCard';
import TraitCard from '../Trait/TraitCard';
import CharacterPersistanceCard from './CharacterPersistanceCard';

export default function CharacterDetailsCard(props) {
  return(
    <Card>
      <Card.Header aria-label='Details Header' style={{minHeight: '49px'}}>
        <span>{props.character.name} </span>
        <span>{props.character.dynasty}</span>
      </Card.Header>
      <Card.Body className='px-0 py-0'>
        <CharacterIdentityCard {...props} />
        <TraitCard {...props} />
        <CharacterPersistanceCard {...props} />
      </Card.Body>
    </Card>
  )
}