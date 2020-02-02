import React, { useEffect, useState } from 'react'
import TraitItem from './TraitItem'

export default function DefaultTraitItem({trait, character, setCharacter, windowWidth}) {
  const [hidden, setHidden] = useState(false)

  const handleClick = () => {
    const effectiveAttributes = {}
    Object.keys(character.attributes).forEach(key => {
      effectiveAttributes[key] = {...character.attributes[key], bonus: character.attributes[key].bonus + (trait.effects[key] || 0)}
    })
    setCharacter({
      ...character, 
      traits: [...character.traits, trait], 
      age: character.age + trait.cost, 
      attributes: effectiveAttributes
    })
  }

  useEffect(() => {  
    const isHidden = () => {
      return character.traits.some(charTrait => {
        return (charTrait.id === trait.id) || trait.opposites.some(opposite => opposite === charTrait.id)
      })
    }
    setHidden(isHidden())
  }, [character.traits])

  return(
    <TraitItem trait={trait} hidden={hidden} onClick={handleClick} windowWidth={windowWidth} />
  )
}