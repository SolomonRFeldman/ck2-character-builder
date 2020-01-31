import React from 'react'
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

  return(
    <ListGroupItem>
      {name[0].toUpperCase() + name.slice(1)}
      <div className='float-right'>
        {attribute.display(attribute)}
        <Button className='mx-2' variant='success' size='sm' onClick={() => handleClick(1)} style={{touchAction: 'manipulation'}}>
          <span style={{color: '#222222'}} className='fa fa-plus' aria-label='Plus' />
        </Button>
        <Button variant='danger' size='sm' onClick={() => handleClick(-1)} style={{touchAction: 'manipulation'}}>
          <span style={{color: '#222222'}} className='fa fa-minus' aria-label='Minus' />
        </Button>
      </div>
    </ListGroupItem>
  )
}