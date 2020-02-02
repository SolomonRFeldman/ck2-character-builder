import React from 'react'
import './Attribute.css'
import { Button, ListGroupItem } from 'react-bootstrap'

export default function Attribute({name, attribute, character, setCharacter}) {
  const handleClick = (direction) => { 
    if(direction === 1 || attribute.base > attribute.minVal) { setCharacter({
      ...character,
      age: character.age + attribute.cost * direction, 
      attributes: {
        ...character.attributes,
        [name]: {...attribute, base: Math.round((attribute.base + attribute.increment * direction) * 10)/10}
      }
    })}
  }
  const displayName = name[0].toUpperCase() + name.slice(1)

  return(
    <ListGroupItem>
      {displayName}
      <div className='float-right'>
        {attribute.display(attribute)}
        <Button className='mx-2' variant='success' size='sm' onClick={() => handleClick(1)}>
          <span className='fa fa-plus attr-glyph' aria-label='Plus' />
        </Button>
        <Button variant='danger' size='sm' onClick={() => handleClick(-1)}>
          <span className='fa fa-minus attr-glyph' aria-label='Minus' />
        </Button>
      </div>
    </ListGroupItem>
  )
}