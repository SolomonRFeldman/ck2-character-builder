import React from 'react'
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import TraitTooltip from './TraitTooltip'

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
    <OverlayTrigger 
      popperConfig={{
        modifiers: {
          preventOverflow: { enabled: false },
          hide: { enabled: false }
        }
      }} 
      placement='bottom' 
      overlay={<Tooltip aria-label={`${trait.name} Trait Tooltip`}><TraitTooltip trait={trait} /></Tooltip>}
    >
      <Image alt={trait.name} onClick={handleClick} src={path} style={{touchAction: 'manipulation'}} className='d-inline-block' />
    </OverlayTrigger>
  )
}