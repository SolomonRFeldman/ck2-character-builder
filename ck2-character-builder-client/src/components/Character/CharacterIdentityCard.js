import React from 'react'
import Card from "react-bootstrap/Card";
import CharacterIdentityForm from './CharacterIdentityForm';

export default function CharacterIdentityCard(props) {
  return(
    <Card>
      <Card.Body className='px-2 py-2'>
        <CharacterIdentityForm {...props} />
      </Card.Body>
    </Card>
  )
}