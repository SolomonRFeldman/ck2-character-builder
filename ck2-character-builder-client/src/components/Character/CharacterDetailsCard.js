import React from 'react'
import Card from "react-bootstrap/Card";
import CharacterIdentityCard from './CharacterIdentityCard';

export default function CharacterDetailsCard(props) {
  return(
    <Card>
      <Card.Header style={{height: '49px'}}>
        <span>{props.character.name} </span>
        <span>{props.character.dynasty}</span>
      </Card.Header>
      <Card.Body className='px-0 py-0'>
        <CharacterIdentityCard {...props} />
      </Card.Body>
    </Card>
  )
}