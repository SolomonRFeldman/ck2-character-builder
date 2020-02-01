import React, { useEffect, useState } from 'react'
import TraitItem from './TraitItem'

export default function EducationItem({trait, character, setCharacter, onClick, windowWidth}) {
  const [hidden, setHidden] = useState(false)
  
  const handleClick = () => {
    const effectiveAttributes = {}
    Object.keys(character.attributes).forEach(key => {
      effectiveAttributes[key] = {
        ...character.attributes[key], 
        bonus: character.attributes[key].bonus + (trait.effects[key] || 0) + (-character.education.effects[key] || 0)
      }
    })
    setCharacter({
      ...character, 
      education: trait, 
      age: character.age + trait.cost - character.education.cost, 
      attributes: effectiveAttributes
    })
    onClick()
  }

  const isHidden = () => character.education && character.education.id === trait.id
  useEffect(() => {
    setHidden(isHidden())
  }, [character.education])

  return(
    <TraitItem trait={trait} hidden={hidden} onClick={handleClick} windowWidth={windowWidth} />
  )
}