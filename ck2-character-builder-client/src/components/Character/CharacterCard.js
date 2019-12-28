import React from 'react'
import CardGroup from 'react-bootstrap/CardGroup'
import AttributeCard from '../Attribute/AttributeCard'
import CharacterDetailsCard from './CharacterDetailsCard'

export default function CharacterCard(props) {
  return(
    <CardGroup>
      <AttributeCard />
      <CharacterDetailsCard />
    </CardGroup>
  )
}