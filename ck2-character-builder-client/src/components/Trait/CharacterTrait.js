import React from 'react'
import { Image } from 'react-bootstrap'

export default function CharacterTrait({trait, character, setCharacter}) {
  const path = `../trait_icons/${trait.nameSlug}.png`

  const handleClick = () => {
    const effectiveAttributes = {}
    Object.keys(character.attributes).forEach(key => {
      effectiveAttributes[key] = {...character.attributes[key], bonus: character.attributes[key].bonus + (-trait.effects[key] || 0)}
    })
    const newTraits = character.traits.filter(charTrait => charTrait.id !== trait.id)
    setCharacter({
      ...character,
      traits: newTraits, 
      age: character.age - trait.cost, 
      attributes: effectiveAttributes
    })
  }

  return(
    <Image onClick={handleClick} src={path} className='d-inline-block' />
  )
}