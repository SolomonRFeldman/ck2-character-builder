import React from 'react'
import CharacterTrait from './CharacterTrait'

export default function CharacterDefaultTrait({character, setCharacter, trait}) {

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
    <CharacterTrait trait={trait} onClick={handleClick} alt={trait.name} />
  )
}