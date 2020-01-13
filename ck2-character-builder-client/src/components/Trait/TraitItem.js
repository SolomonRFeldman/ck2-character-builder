import React from 'react'
import { Dropdown, Image } from 'react-bootstrap'

export default function TraitItem({trait, character, setCharacter}) {
  const path = `../trait_icons/${trait.nameSlug}.png`
  
  const handleClick = () => {
    console.log(trait)
    console.log(character)
    setCharacter({...character, traits: [...character.traits, trait], age: character.age + trait.cost})
  }

  return(
    <Dropdown.Item onClick={handleClick}>
      <Image src={path} className='mr-2' /> 
      {trait.name} 
      <div className="float-right ml-2">{trait.cost}</div>
    </Dropdown.Item>
  )
}