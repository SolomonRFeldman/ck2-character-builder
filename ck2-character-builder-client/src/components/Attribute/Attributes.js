import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Attribute from './Attribute'

export default function Attributes({character, setCharacter}) {
  return(
    <ListGroup>
      {Object.keys(character.attributes).map(key => {
        return (
          <Attribute 
            key={key}
            name={key}
            attribute={character.attributes[key]} 
            character={character} 
            setCharacter={setCharacter}
          />
        )
      })}
    </ListGroup>
  )
}