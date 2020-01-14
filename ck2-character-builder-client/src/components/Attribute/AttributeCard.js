import React from 'react'
import Card from 'react-bootstrap/Card'
import Attributes from './Attributes'

export default function AttributeCard(props) {
  return(
    <Card>
      <Card.Header>Age: {props.character.age > 16 ? props.character.age : 16}</Card.Header>
      <Attributes {...props} />
    </Card>
  )
}