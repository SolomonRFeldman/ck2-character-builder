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

  useEffect(() => {
    const isHidden = () => character.education && character.education.id === trait.id
    setHidden(isHidden())
  }, [character.education, character.education.id, trait.id])

  return(
    <TraitItem trait={trait} hidden={hidden} onClick={handleClick} windowWidth={windowWidth} />
  )
}